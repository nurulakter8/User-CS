import * as Auth from './controller/auth.js'
import * as Home from './viewpage/home_page.js'
import * as About from './viewpage/about_page.js'
import * as Route from './controller/route.js'
import * as Search from './viewpage/search_page.js'
import * as Donate from './viewpage/donate_page.js'


Auth.addEventListener();
Home.addEventListener();
About.addEventListener();
Donate.addEventListener();
Search.addEventListener();

window.onload = () => {
	const pathname = window.location.pathname;
	const hash = window.location.hash;

	Route.routing(pathname,hash);

}

window.addEventListener('popstate', e =>{
	e.preventDefault();
	const pathname = e.target.location.pathname;
	const hash = e.target.location.hash;
	Route.routing(pathname,hash);

})