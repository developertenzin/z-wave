var Wave = (function() {
	// CacheDom
	var $browse = $("#browse");
	var $subNav = $(".sub-nav");
	// Search Form CacheDom
	var $searchForm = $(".search-form");
	var $searchButton = $("#search-button");
	var $closeButton = $("#close-button");
	var $searchInput = $(".search-form > input");

	// Sign in Modal Formj CacheDom
	var $loginButton = $("#login-button");
	var $loginButtonText = $("#login-button > span.login-text");

	var $loginForm = $("#login-form");
	var $emailInput = $("#email");
	var $passwordInput = $("#password");
	var $signinButton = $(".sign-in");
	var $modalCloseButton = $(".close");

	var $emailErrorMessage = $(".email-error");
	var $passwordErrorMessage = $(".password-error");

	var $emailShowBox = $(".show-email");



	// Bind Events
	function showSubNav() {
		$browse.hover(function() {
			$subNav.toggleClass("flexing", 3000);
		});
	}

	function showSearch() {
		$searchButton.on("click", function() {
			$searchForm.removeClass("push-right");
			$searchForm.addClass("push-left");
			$searchInput.focus();
		})
	}

	function closeSearch() {
		$closeButton.on("click", function() {
			$searchForm.removeClass("push-left");
			$searchForm.addClass("push-right");
		})
	}

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function validatePassword(pass) {
		return pass.length >= 6;
	}

	function checkLocalStorage() {
		if (localStorage.email || localStorage.password) {
			$loginButtonText.text("My Account");
			$emailShowBox.text(localStorage.email);
		}
	}


	function formValidator() {
		$signinButton.on("click", function(e) {
			e.preventDefault();
			var userEmail = $emailInput.val();
			var userPassword = $passwordInput.val();
			var valid = true;
			if (!(validateEmail(userEmail))) {
				valid = false;
				$emailErrorMessage.text("Please enter a valid email...");
			} else {
				$emailErrorMessage.text("");
			}
			if (!(validatePassword(userPassword))) {
				valid = false;
				$passwordErrorMessage.text("Please enter a valid password...");
			}
			else {
				$passwordErrorMessage.text("");
			}
			if (valid) {
				localStorage.setItem("email", userEmail);
				localStorage.setItem("password", userPassword);
				$loginForm.submit();
			}
		});
	}

	function showHideModal() {
		$loginButton.click(function() {
			$("#loginModal").modal();
		});

		$modalCloseButton.click(function() {
			$("#loginModal").modal('hide');
		})
	}


	return {
		showSubNav: showSubNav,
		showSearch: showSearch,
		closeSearch: closeSearch,
		checkLocalStorage: checkLocalStorage,
		formValidator: formValidator,
		showHideModal: showHideModal
	}
})();

Wave.showSubNav();
Wave.showSearch();
Wave.closeSearch();
Wave.checkLocalStorage();
Wave.formValidator();
Wave.showHideModal();
FastClick.attach(document.body);
