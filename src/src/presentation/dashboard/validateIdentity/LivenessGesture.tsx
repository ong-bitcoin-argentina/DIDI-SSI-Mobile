export enum LivenessGesture {
	TURN_LEFT,
	TURN_RIGHT,
	SMILE,
	WINK_LEFT,
	WINK_RIGHT
}



export enum TypeGestures {
	description = "description",
	gestureExplanation = "gestureExplanation",
}
export const gestures =(gesture: LivenessGesture, typeGestures: TypeGestures)=>{
	let commonTurnSmile;
	let commonTurnLeft;
	let commonTurnRight;
	let commonWinkLeft;
	let commonWinkRight;
	if(TypeGestures.gestureExplanation === typeGestures){
		commonTurnSmile="Sonreí";
		commonTurnLeft="Mirá a tu hombro izquierdo";
		commonTurnRight="Mirá a tu hombro derecho";
		commonWinkLeft="Guiñá tu ojo izquierdo";
		commonWinkRight= "Guiñá tu ojo derecho"; 
	}
	if(TypeGestures.description === typeGestures){
		const common =
		"Buscá una pared clara, con buena luz y parate delante. Centrate en el recuadro, y cuando te lo pida, ";
		commonTurnSmile = common + "sonreí.";
		commonTurnLeft = common + "mirá al hombro que te indica la pantalla.";
		commonTurnRight = common + "mirá al hombro que te indica la pantalla.";
		commonWinkLeft = common + "guiñá el ojo que te indica la pantalla.";
		commonWinkRight = common + "guiñá el ojo que te indica la pantalla.";
	}
	switch (gesture) {
		case LivenessGesture.SMILE:
			return commonTurnSmile;
		case LivenessGesture.TURN_LEFT:
			return commonTurnLeft;
		case LivenessGesture.TURN_RIGHT:
			return commonTurnRight
		case LivenessGesture.WINK_LEFT:
			return commonWinkLeft;
		case LivenessGesture.WINK_RIGHT:
			return commonWinkRight;
	}
}