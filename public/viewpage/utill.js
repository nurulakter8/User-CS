import * as Element from './element.js'

export function info(title, body, closeModal){
	if (closeModal) closeModal.hide();
	Element.modalInfoboxTittleElement.innerHTML = title;
	Element.modalInfoboxBodyElement.innerHTML = body;
	Element.modalInfobox.show();


}

export function disableButton (button){
	button.disabled = true;
	const originalLabel = button.innerHTML;
	button.innerHTML = 'Wait...' // <button> Lable </button
	return originalLabel;

}

export function enableButton (button, label) {
	if(label) button.innerHTML = label;
	button.disabled = false;
}
// from web
export function sleep (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}