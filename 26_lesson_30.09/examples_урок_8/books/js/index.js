$('#date-now').text(new Date().getFullYear());
$('.menu li a').click(function () {
	$(this).closest('.menu').find('.active').removeClass('active');
	$(this).addClass('active');
})
$('input:text').on('keydown input paste', function () {
	console.log($(this).val());
});

$('.accordion-header').on('click', function () {
	let activeHeader = $(this).hasClass('active') ? $(this) : $(this).parent().find('.accordion-header.active');
	if (!$(this).hasClass('active')) {
		activeHeader.next().slideUp(200).removeClass('active');
		activeHeader.removeClass('active');
		$(this).addClass('active').next().slideToggle(400).addClass('active');
	}
});
let sectionMore = $('#see-more'),
	topCoord = $(window).height() - sectionMore.outerHeight();
$(window).on('resize', function () {
	topCoord = $(window).height() - sectionMore.outerHeight();
	if (!sectionMore.hasClass('closed')) {
		sectionMore.css('top', topCoord);
	}
})
$('.close-green, #not-now').click(function () {
	let section = $(this).parents('section');
	let target = $('.close-green');
	if (section.hasClass('closed')) {
		section.animate({
			top: topCoord
		}, 400);
		target.html('&times;');
	} else {
		section.animate({
			top: '97vh'
		}, 400);
		target.html('&#9650;');
	}
	section.toggleClass('closed');
});
// $('[data-popup]').on('click', popupShow);
$('body').on('click', '[data-popup]', popupShow);

function popupShow(evt) {
	evt.preventDefault();
	let id = $($(this).data('popup'));
	id.fadeIn(600);
};
$('.popup-close').click(function () {
	$(this).closest('.popup-wrapper').fadeOut(400);
});
let textAnim = ['Read our books!', 'Subscribe to news', 'Learn about new books', 'Add books to our library'],
	textId = null,
	textIndex = 0;
$("#start-stop").on('click', showAnimatedText);

function showAnimatedText() {
	$(this).next().addClass('fromTopToDown');
	textId = setInterval(function () {
		$('#text-change').text(textAnim[textIndex]);
		textIndex == textAnim.length - 1 ? textIndex = 0 : textIndex++;
	}, 2000);
	$("#start-stop").html('&times;').off('click', showAnimatedText).on('click', stopAnimatedText);
}

function stopAnimatedText() {
	$('#text-change').text('');
	$(this).next().removeClass('fromTopToDown');
	clearInterval(textId);
	$("#start-stop").text('!').off('click', stopAnimatedText).on('click', showAnimatedText)
}
let userPhone = $('#user-phone');
userPhone.mask("(999) 999-9999");
$('#contact-form').submit(function (e) {
	e.preventDefault();
	let userName = $('#user-name'),
		userEmail = $('#user-email'),
		userPhone = $('#user-phone'),
		userMessage = $('#user-message');
	console.log(userMessage.val().length);
	if (userName.val().length < 2) {
		userName.addClass('invalid');
		return false;
	} else userName.removeClass('invalid');
	if (userEmail.val().length < 7) {
		userEmail.addClass('invalid');
		return false;
	} else userEmail.removeClass('invalid');
	if (userPhone.val().length < 7) {
		userPhone.addClass('invalid');
		return false;
	} else userPhone.removeClass('invalid');
	if (userMessage.val().length < 7) {
		userMessage.addClass('invalid');
		return false;
	} else userMessage.removeClass('invalid');
	$('#thanks-contact h3').text(`Thank you, ${userName.val()}`);
	$('#thanks-contact .content').text(`Your message: ${userMessage.val()}`);
	$('#contact-btn').attr('data-popup', "#thanks-contact");
	$('#contact-btn').click();
})
let isNewsletterPopup = +localStorage.getItem('newsletter');
//console.log(isNewsletterPopup);
if (!isNewsletterPopup) {
	setTimeout(function () {
		$('#newsletter').fadeIn(500);
	}, 1500);
}

$('#forgetMe').click(function () {
	console.log($(this).prop('checked'));
	localStorage.setItem('newsletter', $(this).prop('checked') ? 1 : 0);
});

$('[href^="#"]').on('click', function () {
	if ($(this).attr('hash') !== "") {

		event.preventDefault();

		let hash = $(this).prop('hash');

		$('html, body').animate({
			scrollTop: $(hash).offset().top - 60
		}, 800, function () { });
	}
});


function checkToTop() {
	$('#totop').css({
		bottom: ($(window).scrollTop() > 100 ? '7%' : '-100px')
	});
}
checkToTop();
$(window).scroll(checkToTop);


$('#customers-testimonials').owlCarousel({
	loop: true,
	center: true,
	items: 3,
	margin: 0,
	// dots: true,
	//	autoplay: true,
	//  autoplayTimeout: 8500,
	smartSpeed: 450,
	responsive: {
		0: {
			items: 1
		},
		800: {
			items: 3
		}
	}
});


var category_url = "https://openlibrary.org/subjects/mystery_and_detective_stories.json";

let bookDiv = '';

$.ajax({
	url: category_url,
	dataType: "json",
	beforeSend: function () {
		$('.loader').show();
	}
}).done(function (data) {
	// console.log(data);
	$('.loader').hide();
	if (data.ebook_count == 0) {
		$('.row.books').addClass('justify-content-center my-40')
			.html('<h3>No books found</h3>');
		return false;
	}

	$.each(data.works, function (index, bookInfo) {
		console.log(bookInfo);
		if (bookInfo.authors.length == 1)
			var authorsInfo = `Author: <a href="https://openlibrary.org/${bookInfo.authors[0].key}/">${bookInfo.authors[0].name}</a>`;
		else {
			var authorsInfo = 'Authors: ';
			$.each(bookInfo.authors, function (i, author) {
				authorsInfo += `<a href="https://openlibrary.org/${author.key}/">${author.name}</a>, `;
			});
			authorsInfo = authorsInfo.slice(0, -2);
		}
		bookDiv += `<div class="book">
			<div class="book-title">${bookInfo.title.length < 50 ? bookInfo.title : bookInfo.title.slice(0, 60) + '...'}</div>
			<div class="book-author">${authorsInfo}</div>
			<div class="book-cover"><img src="https://covers.openlibrary.org/b/id/${bookInfo.cover_id}-M.jpg"></div>
			<div class="book-hidden">
				<a href="https://openlibrary.org${bookInfo.key}" class="btn btn-info" target="_blank">More Info</a>
				${bookInfo.availability.is_readable ? `<a href="https://openlibrary.org/borrow/ia/${bookInfo.ia}?ref=ol" class="btn btn-read" target="_blank">Read Book</a>` : ''}
			</div>
		</div>`;
	});

	$('.row.books').html(bookDiv);
}).fail(function () {
	$('.loader').hide();
	$('.row.books').addClass('justify-content-center error my-3').html('<h3 class="text-center">Loading of books failed...<br>An error has occurred.</h3>')
});

