import * as Element from './element.js'
import * as Route from '../controller/route.js'
import * as Auth from '../controller/auth.js'

export function addEventListener() {
	Element.menuDonation.addEventListener('click', () => {
		history.pushState(null, null, Route.routhPath.DONATE);
		donate_page();
	})
}

export function donate_page() {
	if (!Auth.currentUser) {
		Element.root.innerHTML = '<h1> Not allowed</h1>'
		return;
	}
	Element.root.innerHTML =
		`
		<div class="card">
			<img src="/img/donate.png" alt="Donate">
			<p>Please Donate</p>
			<p class="price">$10.00</p>
			<button id="checkout-button">Checkout</button>
		</div>
	`;
	
	  const checkoutButton = document.getElementById('checkout-button')
	  const createStripeCheckout = firebase.functions().httpsCallable('createStripeCheckout')
	  const stripe = Stripe('pk_test_51J6Tc7LDUwi9TcIfw7HM6X52IqstqqqT2UGuS6cuFHlxVOXOqc7yTfHZwOpHLldC2isoJsWXrrkdYV0IqKzD6sm400xw3t2XeL')
	  
	  checkoutButton.addEventListener('click', () => {
		createStripeCheckout()
		  .then(response => {
			const sessionId = response.data.id
			stripe.redirectToCheckout({ sessionId: sessionId })
		  })
	  })

}