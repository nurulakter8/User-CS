import * as Element from '../viewpage/element.js'

export function addEventListener() {
	Element.formSignIn.addEventListener('submit', e => {
		const email = e.target.email.value;
		const password = e.target.password.value;

	});
}

