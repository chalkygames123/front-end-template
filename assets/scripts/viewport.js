const minWidth = 375;
const element = document.querySelector('meta[name="viewport"]');
const updateContent = () => {
	if (window.screen.width < minWidth) {
		element.setAttribute('content', `width=${minWidth}`);
	} else {
		element.setAttribute('content', 'width=device-width');
	}
};

updateContent();

window.addEventListener('orientationchange', updateContent);
