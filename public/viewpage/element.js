//top menu

export const menuSignout = document.getElementById('menu-signout');
export const menuHome = document.getElementById('menu-home');
export const menuAbout = document.getElementById('menu-about');

//form
export const formSearch = document.getElementById('form-search');
export const formSignIn = document.getElementById('form-signin');
export const formResetPassword= document.getElementById('form-resetPassword');
export const formCreateThread = document.getElementById('form-create-thread');
export const formDeleteThread = document.getElementsByClassName('thread-delete-form');
export const formCreateThreadError = {
	title: document.getElementById('form-create-thread-error-title'),
	keywords: document.getElementById('form-create-thread-error-keywords'),
	content: document.getElementById('form-create-thread-error-content'),
}
export const formCreateAccount = document.getElementById('form-create-account');
export const formCreateAccounterror = {
	email: document.getElementById('create-account-error-email'),
	passwords: document.getElementById('create-account-error-password'),
	passwordConfirm: document.getElementById('create-account-error-passwordConfirm'),
}

//main content root
export const root = document.getElementById('root');

// modal bootstrap object
export const modalSigninForm = new bootstrap.Modal(document.getElementById('modal-signin-form'),{backdrop: 'static'});
export const modalResetPasswordForm = new bootstrap.Modal(document.getElementById('modal-forgot-password-form'),{backdrop: 'static'});
export const modalInfobox = new bootstrap.Modal(document.getElementById('modal-infobox'),{backdrop: 'static'});
export const modalInfoboxTittleElement = document.getElementById('modal-infobox-title');
export const modalInfoboxBodyElement = document.getElementById('modal-info-box-body');
export const modalCreateAccount = new bootstrap.Modal(document.getElementById('modal-create-account'),{backdrop: 'static'} );

export const modalCreateThread = new bootstrap.Modal(document.getElementById('modal-create-thread'),{backdrop: 'static'});