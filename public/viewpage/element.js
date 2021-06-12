//top menu

export const menuSignout = document.getElementById('menu-signout');
export const menuHome = document.getElementById('menu-home');
export const menuAbout = document.getElementById('menu-about');

//form

export const formSignIn = document.getElementById('form-signin');
export const formCreateThread = document.getElementById('form-create-thread');
export const formCreateThreadError = {
	title: document.getElementById('form-create-thread-error-title'),
	keywords: document.getElementById('form-create-thread-error-keywords'),
	content: document.getElementById('form-create-thread-error-content'),
}


//main content root
export const root = document.getElementById('root');

// modal bootstrap object
export const modalSigninForm = new bootstrap.Modal(document.getElementById('modal-signin-form'),{backdrop: 'static'});
export const modalInfobox = new bootstrap.Modal(document.getElementById('modal-infobox'),{backdrop: 'static'});
export const modalInfoboxTittleElement = document.getElementById('modal-infobox-title');
export const modalInfoboxBodyElement = document.getElementById('modal-info-box-body');

export const modalCreateThread = new bootstrap.Modal(document.getElementById('modal-create-thread'),{backdrop: 'static'});