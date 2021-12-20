/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LayoutRectangle } from "react-native";
import { Face } from "react-native-camera";

import { LivenessGesture } from "./LivenessGesture";

type SupportedGestures = LivenessGesture.TURN_LEFT | LivenessGesture.TURN_RIGHT;

const traits = (() => {
	function entersRegions(regions: Array<{ low: number; high: number }>) {
		return (extract: (from: Face) => number) => {
			return (history: Face[]) => {
				const series = history.map(extract) as number[];
				const remaining = regions.slice().reverse();
				for (const value of series) {
					const currentRegion = remaining[remaining.length - 1];
					if (currentRegion.low < value && value < currentRegion.high) {
						remaining.pop();
					}
					if (remaining.length === 0) {
						return true;
					}
				}
				return false;
			};
		};
	}
	const probabilityJump = entersRegions([
		{ low: 0.75, high: 1.0 },
		{ low: 0.0, high: 0.25 },
		{ low: 0.75, high: 1.0 }
	]);
	const turn = entersRegions([
		{ low: -10, high: 10 },
		{ low: 10, high: 25 },
		{ low: 25, high: 50 }
	]);
	return {
		blinkLeft: probabilityJump(f => f.leftEyeOpenProbability!),
		blinkRight: probabilityJump(f => f.rightEyeOpenProbability!),
		smile: probabilityJump(f => f.smilingProbability!),
		turnLeft: turn(f => f.yawAngle!),
		turnRight: turn(f => -1 * f.yawAngle!)
	};
})();

function normalizeFaceBounds(bounds: Face["bounds"]) {
	return {
		minX: bounds.origin.x,
		maxX: bounds.origin.x + bounds.size.width,
		minY: bounds.origin.y,
		maxY: bounds.origin.y + bounds.size.height
	};
}
function normalizeLayoutBounds(bounds: LayoutRectangle) {
	return {
		minX: bounds.x,
		maxX: bounds.x + bounds.width,
		minY: bounds.y,
		maxY: bounds.y + bounds.height
	};
}
function containsBounds(cameraBounds: LayoutRectangle, faceBounds: Face["bounds"]): boolean {
	const normalCamera = normalizeLayoutBounds(cameraBounds);
	const normalFace = normalizeFaceBounds(faceBounds);

	function inRange(...values: number[]): boolean {
		return values.every(p => 20 < p);
	}

	return inRange(
		normalFace.minX - normalCamera.minX,
		normalCamera.maxX - normalFace.maxX,
		normalFace.minY - normalCamera.minY,
		normalCamera.maxY - normalFace.maxY
	);
}

interface LivenessCheckerState {
	history: History;
	faceId: number | undefined;
	firstAdded: Date;
	lastAdded: Date;
	wasEverOverTime: boolean;
}

export class LivenessChecker {
	static supportedGestures: [SupportedGestures, ...SupportedGestures[]] = [
		LivenessGesture.TURN_LEFT,
		LivenessGesture.TURN_RIGHT
	];

	static empty(): LivenessChecker {
		return new LivenessChecker(undefined);
	}

	addFacesToState(detectedFaces: Face[]): LivenessChecker {
		if (detectedFaces.length !== 1) {
			return new LivenessChecker(undefined);
		}
		const face = detectedFaces[0];
		const now = new Date();

		if (this.data === undefined) {
			return new LivenessChecker({
				history: new History([]),
				faceId: face.faceID,
				firstAdded: now,
				lastAdded: now,
				wasEverOverTime: false
			});
		}
		const isOverTime = now.getTime() - this.data.lastAdded.getTime() > 2000;

		if (face.faceID !== this.data.faceId) {
			return new LivenessChecker(undefined);
		} else if (isOverTime && this.data.wasEverOverTime) {
			return new LivenessChecker(undefined);
		}

		return new LivenessChecker({
			history: new History([...this.data.history.values, face]),
			faceId: this.data.faceId,
			firstAdded: this.data.firstAdded,
			lastAdded: now,
			wasEverOverTime: isOverTime || this.data.wasEverOverTime
		});
	}

	canTakePhoto(cameraBounds: LayoutRectangle): boolean {
		if (this.data === undefined) {
			return false;
		}
		const history = this.data.history;
		return (
			history.length() > 10 &&
			(history.ever(traits.blinkLeft) || history.ever(traits.blinkRight)) &&
			history.after(history.length() - 5, faces => !traits.smile(faces)) &&
			history.after(history.length() - 5, faces => faces.every(face => containsBounds(cameraBounds, face.bounds)))
		);
	}

	historyLength(): number {
		return this.data?.history.length() ?? 0;
	}

	history() {
		return this.data?.history;
	}

	didPerformGesture(gesture: LivenessGesture, startingIndex: number): boolean {
		if (this.data === undefined || this.data.history.length() <= startingIndex + 10) {
			return false;
		}
		const history = this.data.history;

		switch (gesture) {
			case LivenessGesture.TURN_LEFT:
				return history.onlyAfter(startingIndex, traits.turnLeft) && history.never(traits.turnRight);
			case LivenessGesture.TURN_RIGHT:
				return history.onlyAfter(startingIndex, traits.turnRight) && history.never(traits.turnLeft);
			default:
				return false;
		}
	}

	canPerformGesture(gesture: LivenessGesture): boolean {
		if (this.data === undefined) {
			return false;
		}

		const history = this.data.history;
		switch (gesture) {
			case LivenessGesture.TURN_LEFT:
				return !history.ever(traits.turnRight);
			case LivenessGesture.TURN_RIGHT:
				return !history.ever(traits.turnLeft);
			default:
				return false;
		}
	}

	private data: LivenessCheckerState | undefined;

	private constructor(data: LivenessCheckerState | undefined) {
		this.data = data;
	}
}

class History {
	values: Face[];

	constructor(values: Face[]) {
		this.values = values;
	}

	length() {
		return this.values.length;
	}

	onlyAfter(startingIndex: number, verifier: (history: Face[]) => boolean): boolean {
		const pre = this.values.slice(0, startingIndex);
		const post = this.values.slice(startingIndex);
		return verifier(post) && !verifier(pre);
	}

	after(startingIndex: number, verifier: (history: Face[]) => boolean): boolean {
		const post = this.values.slice(startingIndex);
		return verifier(post);
	}

	ever(verifier: (history: Face[]) => boolean): boolean {
		return verifier(this.values);
	}

	never(verifier: (history: Face[]) => boolean): boolean {
		return !verifier(this.values);
	}
}
