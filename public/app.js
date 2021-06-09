import * as Auth from './controller/auth.js'
import * as Home from './viewpage/home_page.js'
import * as About from './viewpage/about_page.js'
import * as Route from './controller/route.js'


Auth.addEventListener();
Home.addEventListener();
About.addEventListener();

window.onload = () => {
	const pathname = window.location.pathname;
	const href = window.location.href;

	Route.routing(pathname,href);

}