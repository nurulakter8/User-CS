import * as Home from '../viewpage/home_page.js'
import * as About from '../viewpage/about_page.js'

export const routhPath = {
	HOME: '/',
	ABOUT: '/about',
}

export const routes = [
	{path: routhPath.HOME, page: Home.home_page},
	{path: routhPath.ABOUT, page: About.about_page},

];

export function routing (pathname, href){
	const route = routes.find(r => r.path == pathname);
	if (route) route.page();
	else route[0].page();
}