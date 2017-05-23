// Avoid `console` errors in browsers that lack a console.

function initializeApp() {
	//GENERAL FUNCTIONS

	//LOAD CONTENT DINAMICALLY
	$('.div_loadme').each(function (index, element) {
		var file_src = $(element).data('src');
		if (file_src) {
			$(element).load(file_src, function () {
				$(element).children().unwrap();

				//if carousel ticker...
				$('.carousel#carousel-ticker').each(function (index, element) {
					load_ticker_bottom(element);
				});

				//if rss_reader...
				$('.rss_reader').each(function (index, element) {
					$.ajax({
						url      : 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent($(this).data('url')),
						dataType : 'json',
						success  : function (data) {
							console.log(data);
						  	if (data.responseData.feed && data.responseData.feed.entries) {
								$(element).find('li').remove();
							  	$.each(data.responseData.feed.entries, function (i, e) {
									//console.log(e);
									$(element).find('ul').append('<li><a href="'+e.link+'" target="_blank">'+e.title+'</a></li>');
								});
							}
					  	}
					});
				});
			});
		}
	});

	//dropdown-select general functionality to mimic select element
	$(document).on('click', '.dropdown-select > .dropdown-menu > li > a', function (event) {
		$(this).parent().addClass('active').siblings('.active').removeClass('active')
		.closest('.dropdown').find('.btn')
		.html($(this).text() + ' <span class="caret"></span>')
		.end().data('value', $(this).parent().data('value'));
	});

	//DROPDOWN FILTER
	$(document).on('click', '.dropdown-filter > .dropdown-menu > li > a', function (event) {
		$(this).closest('.dropdown').dropdownFilter();
	});

	$.fn.extend({
		dropdownFilter : function () {
			//if dropdown element doesnt have a value, find the selected item and set the value
			if (!$(this).data('value')) {
				var found_val;
				if ($(this).find('.dropdown-menu > li.active').length > 0) {
					found_val = $(this).find('.dropdown-menu > li.active').first().data('value');
				} else {
					found_val = $(this).find('.dropdown-menu > li[data-active="true"]').first().data('value');
				}
				$(this).data('value', found_val);
			}
			//get selected value
			var selected_value = $(this).data('value');

			//get target element
			var target = $(this).data('target');

			//check if option to ignore order is active
			var ignoreOrder = $(this).data('ignore-order');

			if (ignoreOrder) { //just change visibility

				$(target).children().each(function (index, element) {
					console.log($(element).attr('class'));
					if (!selected_value || $(element).hasClass(selected_value)) {
						$(element).fadeTo('slow', 1);
					} else {
						$(element).fadeTo('fast', 0);
					}
				});

			} else { //move elements through DOM

				$(target).children().each(function (index, element) {
					//tags all elements with their original order (index)
					if (!$(element).data('index')) {
						$(element).data('index', index + 1);
					}
					if (!selected_value || $(element).hasClass(selected_value)) {
						$(element).removeClass('hidden').hide().fadeIn('slow');
					} else {
						$(element).addClass('hidden');
						var temp_el = $(element).detach();
						$(target).append(temp_el);
					}
				});
				var visible_items = $(target).children(':visible').detach();
				visible_items.sort(function (a, b) {
					return +$(a).data('index') - +$(b).data('index');
				});
				$(target).prepend(visible_items);
			}
			//check if its a group
			$group=$(this).closest('.dropdown_filter_group');
			if($group.length){
				//saves current dropdown's index
				this_index=$(this).index('.dropdown-filter');
				$group.find('.dropdown-filter').each(function (index, element){
					//compares to current dropdown to avoid changing both labels
					if($(element).index('.dropdown-filter')!==this_index){
						var def_value=$(element).find('[data-active="true"]').data('label');
						//changes label to show as "not selected"
						$(element).find('.dropdown-toggle').html(def_value + ' <span class="caret"></span>');
					}
				});
			}
		}
	});

	/*DASHBOARD FOR CLIENTS NAVIGATION*/
	$(".high_light").click(function () {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	$(".dashboard_nav .dropdown-select .dropdown-menu li a").click(function () {
		if (!$(this).parent().hasClass('active')) {
			var tab_index = $(this).parent().addClass('active').siblings().removeClass('active').end().index();
			//update tab
			$('#carousel-dashboard .item').each(function (index, element) {
				$(element).find('.dashboard-tab').eq(tab_index).fadeIn('slow').siblings().hide();
			});
		}
	});

	$(".dashboard_nav .dashboard-icons-nav button").click(function () {
		if (!$(this).hasClass('active')) {
			$('#carousel-dashboard')
			.removeClass('dashboard-view-card dashboard-view-table dashboard-view-map dashboard-view-graph')
			.addClass('dashboard-view-' + $(this).data('type'));
			$(this).addClass('active').siblings().removeClass('active');
		}
	});

	/*CLIENT CENTERS MAP PAGE*/

	function map_toggle_zoom(m_region) {
		$('body').toggleClass('zoomed');

		var obj = '.zoom_box';
		if ($('body').hasClass('zoomed')) {
			$(obj).addClass('zoom_' + m_region);
		} else {
			for (r in map_regions) {
				$(obj).removeClass('zoom_' + map_regions[r]);
			}
		}
	}

	$(".geography_zoomable li").click(function (event) {
		if ((!$('.modal_competitive_active').length) && (!$('body').hasClass('zoomed'))) {
			map_toggle_zoom($(this).attr('id'));
		}
	});

	$(".btn_zoom_out").click(function (event) {
		map_toggle_zoom(0);
	});

	if ($('.geography_zoomable').length > 0) {
		var map_regions = ['na', 'sa', 'eu', 'as'];
	}

	$('.client_centers_markers li a').click(function (e) {
		if (!$(this).parent().hasClass('inactive')) {
			$(this).toggleClass('active');
		}
	});

	//$(document).on('click','.wrapper-client_centers',function(event) {
	$('.wrapper-client_centers').click(function (event) {
		if ($('.modal_competitive_active').length > 0) {
			$('.modal_competitive').modal('hide');
		}
	});

	$(document).on('hidden.bs.modal', '.modal_client_centers.modal_competitive', function (event) {
		$('.client_centers_markers li a[data-target="#' + $(this).attr('id') + '"]').removeClass('active');
		$(this).removeClass('modal_competitive_active');
	});

	$(document).on('show.bs.modal', function (event) {
		$(".touch_device .carousel-inner .videobox").each(function (index, element) {
			$(element).swipe({});
		});

		//Enable swiping... only for touch devices
		$(".touch_device .carousel-inner").each(function (index, element) {
			$(element).swipe({
				//Generic swipe handler for all directions
				swipeRight : function (event, direction, distance, duration, fingerCount) {
					$(this).parent().carousel('prev');
				},
				swipeLeft : function () {
					$(this).parent().carousel('next');
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				threshold : 0,
				excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
			});
		});
	});

	//COMPETITIVE MODALS START
	$(document).on('show.bs.modal', '.modal_competitive', function (event) {
		if ($('.modal_competitive_active').length > 0) {
			$('.modal_competitive').not(this).modal('hide');
		} else {
			$('body').addClass('modal-open-competitive');
		}
		$(this).addClass('modal_competitive_active');
	});

	//COMPETITIVE MODALS END

	//swipe functionality only for touch devices
	$(".touch_device .carousel-inner .videobox").each(function (index, element) {
		$(element).swipe({});
	});

	//Enable swiping... only for touch devices
	$(".touch_device .carousel-inner").each(function (index, element) {
		$(element).swipe({
			//Generic swipe handler for all directions
			swipeRight : function (event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('prev');
			},
			swipeLeft : function () {
				$(this).parent().carousel('next');
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold : 0,
			excludedElements : $.fn.swipe.defaults.excludedElements + ", .videobox_slider"
		});
	});

	//start carousel for subway menu
	$('.carousel.subway_slides').each(function (index, element) {
		$(element).carousel();
	});

	$('.carousel.subway_slides').on('slid.bs.carousel', function () {
		adjust_content_onleave($(this).closest('.carousel'));
	});

	//start carousel
	$('.carousel.slide-viewer').each(function (index, element) {
		$(element).carousel();
	});

	$('.carousel.slide-viewer').on('slid.bs.carousel', function () {
		adjust_content_onleave($(this).closest('.carousel'));
	});

	//start carousel for ticker/marquee
	$('.carousel#carousel-ticker').each(function (index, element) {
		load_ticker_bottom(element);
	});

	//start carousel for iphone menu
	$('.carousel.iphone_slides').each(function (index, element) {
		$(element).carousel();
	});

	//start all simple slides carousel
	$('.carousel.simple_slides').each(function (index, element) {
		$(element).carousel();
	});

	//fix for boxes with small content and lots of buttons
	$('.box_selection').each(function (index, element) {
		if (!$(element).hasClass('snap_to_fit')) {
			var box_items = $(element).find('.box_selection_item').length;
			var item_height = 70;
			var max_height = parseInt($(element).find('.box_selection_content_column').css('max-height').replace('px', ''));
			var new_height = box_items * item_height;
			if (max_height) {
				if (new_height > max_height) {
					new_height = max_height;
				}
			}
			$(element).find('.box_selection_content_column').css({
				'min-height' : new_height
			});
		}
	});

	$(document).on('click', '.box_selection_item', function (event) {
		event.preventDefault();
		event.stopPropagation();
		if (!$(this).hasClass('active')) {

			adjust_content_onleave($(this).closest('.box_selection'));

			$(this).addClass('active');
			$(this).siblings('.box_selection_item').removeClass('active');

			box_index = $(this).index();

			$(this).closest('.box_selection').find('.box_selection_content').each(function (index, element) {
				if (index === box_index) {
					$(element).fadeIn('slow', function () {
						$(element).addClass('active');
					});
				} else {
					$(element).hide().removeClass('active');
				}
			});

		}
	});

	// remove model from DOM
	$('body').on('hidden.bs.modal', '.modal', function () {
		$(this).removeData('bs.modal');
		$(".modal-graph-nav > .btnActive").removeClass("active");
		$("div.btnActive:eq(0)").addClass("active");
		$("#dashboard-KPI .modal-graph-nav > .btnActive").removeClass("active");
		$("div.btnActive:eq(0)").addClass("active");
		$("#dashboard-KPI .modal-graph-nav > .btnActive:eq(0)").addClass("active");
	});

	// add active class on chart of dashboard
	$(document).on('click', '.modal-graph-nav > .btnActive', function (event) {
		$(".modal-graph-nav > .btnActive").removeClass("active");
		$(this).addClass("active");
		$("#dashboard-KPI .modal-graph-nav > .btnActive").removeClass("active");
		$(this).addClass("active");
	});

	/*animate logo on cardview splash*/
	$(document).ready(function() {
		if($(".logo-container").length && !$(".logo-container").closest('.hidden').length){
			animate_logo();
		}
	});
	function animate_logo(){
		$(".logo-container").fadeIn(1000).delay(100).fadeOut(2000);
			setTimeout(function() {
				 $(".ratio_container").removeClass('hidden').hide().fadeIn('slow');
			 }, 2500);
	}

	//HANDLE SPLASH ICONS
	$('.wrapper_splash').each(function (index, element) {
		if(CURRENT_CLIENT && CURRENT_CLIENT.hasOwnProperty('splash_redirect')){
			$('.splash_v1').hide();
			location.hash = '#/'+CURRENT_CLIENT.splash_redirect;
		}
		if(CURRENT_CLIENT && CURRENT_CLIENT.hasOwnProperty('splash')){//cardview
			$('.splash_v1').hide();
			$('.wrapper-card').removeClass('hidden');
			if(CURRENT_CLIENT.hasOwnProperty('main_title')){
				$('.wrapper-card').find('h1').html(CURRENT_CLIENT.main_title);
			}
			animate_logo();
		}else{
			if (NO_SPLASH_ANIMATIONS) {
				add_no_animation_class();
			}
			if (CURRENT_CLIENT && CURRENT_CLIENT.name !== 'ibm') {
				if (CURRENT_CLIENT.hasOwnProperty('main_title')) {
					$(document).prop('title', CURRENT_CLIENT.main_title);
				}
				if (CURRENT_CLIENT.hasOwnProperty('splash_header')) {
					$('.splash_header_text').html(CURRENT_CLIENT.splash_header);
				}

				if (CURRENT_CLIENT.CLIENT_STRUCTURE) {
					if (CURRENT_CLIENT.hasOwnProperty('client_chapters')) {
						var new_client_chapter;
						var client_chapters = CURRENT_CLIENT.client_chapters;
						var key;
						for (key in client_chapters) {
							//var key = 0;
							new_client_chapter = $('.btn_splash_client').first().clone();
							new_client_chapter.addClass('btn_splash_cli_' + CURRENT_CLIENT.name + ' btn_splash_cli_' + client_chapters[key].name)
							.find('a').attr('href', '#' + client_chapters[key].name)
							.find('span').html(client_chapters[key].label);

							$('.btn_splash_client').last().after(new_client_chapter);
							new_client_chapter = '';
						}
						//removes default client splash button
						$('.btn_splash_client').first().remove();
					}

					if (CURRENT_CLIENT.hasOwnProperty('splash_bg_image_num') && CURRENT_CLIENT.hasOwnProperty('splash_bg_image_base_name')) { //replaces bg images
						//image folder
						var img_folder;
						if (CURRENT_CLIENT.hasOwnProperty('splash_bg_image_folder')) {
							img_folder = CURRENT_CLIENT.splash_bg_image_folder;
						} else {
							img_folder = 'view/cli_' + CURRENT_CLIENT.name + '/images/';
						}

						var img_extension = '.jpg'; //default
						if (CURRENT_CLIENT.hasOwnProperty('splash_bg_image_extension')) {
							img_extension = CURRENT_CLIENT.hasOwnProperty('splash_bg_image_extension');
						}

						var max_imgs = 5;
						var imgs_arr = [];
						//populate an array with img numbers
						for (i = 1; i <= CURRENT_CLIENT.splash_bg_image_num; i += 1) {
							imgs_arr.push(i);
						}

						//shuffle the array
						imgs_arr = arrayShuffle(imgs_arr);

						//remove extra images if more then max
						if (CURRENT_CLIENT.splash_bg_image_num > max_imgs) {
							imgs_arr = imgs_arr.slice(0, max_imgs);
						}

						//image url
						//var img_url=img_folder + CURRENT_CLIENT.splash_bg_image_base_name + randomInteger(1,CURRENT_CLIENT.splash_bg_image_num) + img_extension;

						//applying to page
						//$('body').css('background-image','url('+img_url+')');

						//removing current images
						$('.imagebox_bg img').each(function (index, element) {
							$(element).remove();
						});

						for (i = 0; i <= imgs_arr.length; i += 1) {
							$('.imagebox_bg_posters').append($("<img />", {
									src : img_folder + CURRENT_CLIENT.splash_bg_image_base_name + imgs_arr[i] + img_extension
								}));
						}

						//adding an overlay for readability when needed
						if (CURRENT_CLIENT.hasOwnProperty('splash_bg_overlay_color') && CURRENT_CLIENT.hasOwnProperty('splash_bg_overlay_opacity')) {
							if(!$('.splash_overlay').length){
								$('body').prepend(
									$('<div class="splash_overlay" />')
									.css('background-color', CURRENT_CLIENT.splash_bg_overlay_color)
									.css('opacity', CURRENT_CLIENT.splash_bg_overlay_opacity));
							}
						}else{
							if($('.splash_overlay').length){
								$('.splash_overlay').remove();
							}
						}
					}

				} else {
					$('.btn_splash_client').each(function (index, element) {
						if (CURRENT_CLIENT) {
							$(element).addClass('btn_splash_cli_' + CURRENT_CLIENT.name).find('a').attr('href', '#' + CURRENT_CLIENT.name).find('span').html(CURRENT_CLIENT.label);
						} else {
							$(element).find('a').attr('href', '#').find('span').html('No Client Selected');
						}
					});
				}
			} else {
				$('.btn_splash_client').hide();
			}

			if (CURRENT_CLIENT === null || !CURRENT_CLIENT.HAS_APPS_CHAPTER) { //remove apps chapter
				$('.btn_splash_apps').hide();
			}

			if (CURRENT_CLIENT === null || !CURRENT_CLIENT.HAS_RPO_CHAPTER) { //remove rpo chapter
				$('.btn_splash_rpo').hide();
			}

			if (CURRENT_CLIENT === null || !CURRENT_CLIENT.HAS_ORALS) { //remove ORALS chapter
				$('.btn_splash_orals').hide();
			}

			if (CURRENT_CLIENT !== null && CURRENT_CLIENT.hasOwnProperty('HAS_GENERIC_CHAPTERS') && !CURRENT_CLIENT.HAS_GENERIC_CHAPTERS) { //remove generic chapters
				$('.btn_splash_ibm,.btn_splash_gps,.btn_splash_client_centers').hide();
			}

			//count remaining items
			var num_items_splash = $(element).find('.btn_splash:visible').length;
			$(element).addClass('items_' + num_items_splash);
		}
	});

	//Generating the menu on the fly

	$('.menuRow').each(function (index, element) {

		$(function () {
			$('a').on('touchend', function (e) {
				var el = $(this);
				el.click();
			});
		});

		//BACK BUTTON
		//if(!$('.no_back_button').length){
		$(element).before($('<button />', {
				class : 'site_back_button'
			}));
		//}

		$(".site_back_button").on('click', function (event) {
			event.stopPropagation();

			if (location.hash == "#/bangalore_india") {
				location.hash = "#/bangalore";
			}
			// else if(location.hash == "#/manila_philippines"){
			// 	location.hash = "#/manila";
			// }
			else {
				window.history.back();
			}
		});

		var menu_client = Array();
		if (CURRENT_CLIENT && CURRENT_CLIENT.name != 'ibm') {
			menu_client = Array(CURRENT_CLIENT.label, CURRENT_CLIENT.name);
		}

		var apps_chapter = Array();
		if (CURRENT_CLIENT != null && CURRENT_CLIENT.HAS_APPS_CHAPTER) { //if HAS_APPS_CHAPTER==1 enable it
			apps_chapter = Array('ARCollect', 'apps');
		}

		var rpo_chapter = Array();
		if (CURRENT_CLIENT != null && CURRENT_CLIENT.HAS_RPO_CHAPTER) {
			rpo_chapter = Array('RPO', 'rpo_about');
		}

		var orals_chapter = Array();
		if (CURRENT_CLIENT != null && CURRENT_CLIENT.HAS_ORALS) {
			orals_chapter = Array('ORALS', 'nestle_orals');
		}

		//LEVEL 1 vars
		var menu_items = Array(//format: Array('Label','link')
				Array('Home', '/'),
				menu_client,
				Array(CHAPTER_IBM.label, CHAPTER_IBM.name),
				Array(CHAPTER_GPS.label, CHAPTER_GPS.name),
				Array(CHAPTER_LOCATIONS.label, CHAPTER_LOCATIONS.name),
				apps_chapter,
				rpo_chapter,
				orals_chapter);

		var menu_subitems;
		var cur_chapter;

		//LEVEL 2 vars
		if ($('.wrapper-gps').length > 0) { //GPS page/subpage
			if (CURRENT_CLIENT === CLIENT_GBS) {
				cur_chapter = CHAPTER_GBS.name;
				menu_subitems = CHAPTER_GBS.menu_subitems;
			} else {
				cur_chapter = CHAPTER_GPS.name;
				menu_subitems = CHAPTER_GPS.menu_subitems;
			}
		} else if ($('.wrapper-locations').length > 0) { //locations page/subpage
			cur_chapter = CHAPTER_LOCATIONS.name;
			//no menu_subitems;
		} else if ($('.wrapper-ibm').length > 0) { //IBM page/subpage
			cur_chapter = CHAPTER_IBM.name;
			menu_subitems = CHAPTER_IBM.menu_subitems;
		} else if ($('.wrapper-apps').length > 0) { //APPS page/subpage
			cur_chapter = CHAPTER_APPS.name;
			menu_subitems = CHAPTER_APPS.menu_subitems;
		} else if ($('.wrapper-rpo').length > 0) { //RPO page/subpage
			cur_chapter = CHAPTER_RPO.name;
			menu_subitems = CHAPTER_RPO.menu_subitems;
		} else if ($('.wrapper-orals').length > 0) { //ORALS page/subpage
			cur_chapter = CHAPTER_ORALS.name;
			menu_subitems = CHAPTER_ORALS.menu_subitems;
		} else if ($('.wrapper-gbs').length > 0) { //GBS page/subpage
			cur_chapter = CHAPTER_GBS.name;
			menu_subitems = CHAPTER_GBS.menu_subitems;
		} else if ($('.wrapper-gbs_locations').length > 0) { //GBS Locations page/subpage
			cur_chapter = CHAPTER_GBS_LOCATIONS.name;
			//no menu_subitems;
		} else if ($('.wrapper-gbs_ibm').length > 0) { //GBS IBM page/subpage
			cur_chapter = CHAPTER_GBS_IBM.name;
			//no menu_subitems;
		} else if ($('.wrapper-client').length > 0) { //Customer page/subpage
			if (CURRENT_CLIENT) {
				cur_chapter = CURRENT_CLIENT.name;

				if (CURRENT_CLIENT.hasOwnProperty('menu_subitems')) {
					menu_subitems = CURRENT_CLIENT.menu_subitems;
				}
			}
		}

		//gets current page (to flag the menu item if needed)
		var currentPage = window.location.hash;
		currentPage = currentPage.replace("/", "");
		currentPage = currentPage.replace("#", "");

		//check for subpage inside subchapter to highlight item properly
		if (cur_chapter !== currentPage) { //not chapter main page
			//test if it is a subchapter page
			var test_subitem = 0;
			for (var key_page in menu_subitems) {
				if (currentPage === menu_subitems[key_page][1]) {
					test_subitem = 1;
				}
			}
			//if not a subchapter
			if (!test_subitem) {
				//test if class of any subchapter is present
				for (var key_page2 in menu_subitems) {
					if ($('.wrapper-' + menu_subitems[key_page2][1]).length > 0) {
						//then it is a subpage of subchapter
						currentPage = menu_subitems[key_page2][1];
					}
				}
			}
		}

		if (CURRENT_CLIENT) {
			//special case for client-focused navigation structure
			if (CURRENT_CLIENT.CLIENT_STRUCTURE) {
				if (CURRENT_CLIENT.hasOwnProperty('menu_items')) {
					//override menu_items
					menu_items = CURRENT_CLIENT.menu_items;
				}

				if (!HAS_GENERIC_CHAPTERS && cur_chapter !== CURRENT_CLIENT.name) {
					if (CURRENT_CLIENT.hasOwnProperty('client_generic_chapter') && CURRENT_CLIENT.hasOwnProperty('menu_subitems_client')) {
						//if others then point to flagged generic chapter
						menu_subitems = CURRENT_CLIENT.menu_subitems_client[CURRENT_CLIENT.client_generic_chapter];
						currentPage = cur_chapter;
						cur_chapter = menu_items[CURRENT_CLIENT.client_generic_chapter][1];
					}
				}

				if (cur_chapter === CURRENT_CLIENT.name && CURRENT_CLIENT.hasOwnProperty('menu_subitems_client')) {
					//if client chapter then apply correct chapter name
					for (var key in menu_items) {
						if (menu_items[key][1] !== '/') {
							if ($('.wrapper-' + menu_items[key][1]).length > 0) {
								cur_chapter = menu_items[key][1];
								//console.log(CURRENT_CLIENT.menu_subitems_client[key-1]);
								menu_subitems = CURRENT_CLIENT.menu_subitems_client[key - 1];
							}
						}
					}
				}
			}
		}

		var menu_max_items = 9;

		//LEVEL 1 creation
		var circleMenuLv1 = $('<ul />', {
				'class' : 'circleMenu'
			});
		var menu_items_count = 0;

		for (var key in menu_items) {
			if (cur_chapter === menu_items[key][1]) {
				activeClass = 'active';
			} else {
				activeClass = ''
			}
			if (menu_items[key].length > 0) {
				circleMenuLv1.append(
					$('<li />').append(
						$('<a />', {
							'href' : '#' + menu_items[key][1]
						}).append(
							$('<button />', {
								'type' : 'button',
								'class' : activeClass + ' mn_' + menu_items[key][1],
								'html' : menu_items[key][0]
							}))));
			}

			menu_items_count++;
		}

		if (menu_items_count < menu_max_items) { //completing items
			for (var i = menu_max_items - menu_items_count; i < menu_max_items; i++) {
				circleMenuLv1.append($('<li />'));
			}
		}

		//LEVEL 2 creation
		var append_lv2;
		if (menu_subitems) {
			var circleMenuLv2 = $('<ul />', {
					'class' : 'circleMenu'
				});

			menu_items_count = 0;
			for (var key in menu_subitems) {
				if (menu_subitems[key].length > 0) {
					if (currentPage == menu_subitems[key][1]) {
						activeClass = 'active';
					} else {
						activeClass = ''
					}
					circleMenuLv2.append(
						$('<li />').append(
							$('<a />', {
								'href' : '#' + menu_subitems[key][1]
							}).append(
								$('<button />', {
									'type' : 'button',
									'class' : activeClass + ' mnsub_' + cur_chapter,
									'html' : menu_subitems[key][0]
								}))));
				} else {
					circleMenuLv2.append(
						$('<li />').append());
				}
				menu_items_count++;
			}
			if (menu_items_count < menu_max_items) { //completing items
				for (i = menu_max_items - menu_items_count; i < menu_max_items; i++) {
					circleMenuLv2.append($('<li />'));
				}
			}

			append_lv2 = $('<div />', {
					'class' : 'menuWrapper menuWrapperLv2'
				}).append(
					circleMenuLv2);
		}

		$(element).html(''); //erase any outdated menu content
		$(element).append(
			$('<div />', {
				'class' : 'menuOverlay'
			})).append(
			$('<button />', {
				'type' : 'button',
				'class' : 'mn_menu',
				'text' : 'Menu'
			})).append(
			$('<div />', {
				'class' : 'menuWrapper menuWrapperLv1'
			}).append(
				circleMenuLv1)).append(
			append_lv2);
	});

	$('.menuRow a').click(function (e) {
		closeMenu();
	});

	$('.mn_menu').click(function (e) {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.menuWrapperLv1').fadeToggle(300, function () {
				$('.menuWrapperLv2').fadeToggle(300).toggleClass('active');
			}).toggleClass('active');
			$('.menuOverlay').fadeIn(500);
		} else {
			//$('.menuWrapperLv2').fadeToggle(300, function() {
			//	$('.menuWrapperLv1').fadeToggle(300).toggleClass('active');
			//}).toggleClass('active');
			closeMenu();
		}

	});

	$('.menuOverlay').click(function (e) {
		//$('.mn_menu').click();
		closeMenu();
	});

	//CLICABLE ROWS
	$('.clicable_tr tr').click(function () {
		//window.location = $(this).find('a').first().attr('href');
		$(this).find('a').first().click();
	});

	//CATEGORY LISTING

	$(document).on('click', '.category_listing_control_up,.category_listing_control_down', function (event) {
		var list_items = $(this).closest('.category_listing_controls').siblings('.category_listing_items');
		var scrolled = list_items.scrollTop();
		var scroll_unit = list_items.height();

		if ($(this).hasClass('category_listing_control_up')) {
			scrolled = scrolled - scroll_unit;
		} else if ($(this).hasClass('category_listing_control_down')) {
			scrolled = scrolled + scroll_unit;
		}
		list_items.clearQueue();
		list_items.animate({
			scrollTop : scrolled
		});
	});

	// SCROLLABLE CONTENT - SIMILAR TO CATEGORY LISTING BUTTONS

	$(document).on('click', '.scrollable_control_up,.scrollable_control_down', function (event) {
		var list_items = $(this).closest('.scrollable_controls').siblings('.scrollable_text');
		var scrolled = list_items.scrollTop();
		var scroll_unit = list_items.height() - 25;
		if ($(this).hasClass('scrollable_control_up')) {
			scrolled = scrolled - scroll_unit;
			//console.log("working"+scrolled);
		} else {
			scrolled = scrolled + scroll_unit;
		}
		list_items.clearQueue();
		list_items.animate({
			scrollTop : scrolled
		});

	});

	$(document).on('mousewheel', '.scrollable_text', function (event) {
		event.preventDefault();

		var scrollTop = this.scrollTop;
		this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
	});

	//detect touch devices
	function is_touch_device() {
		return 'ontouchstart' in window // works on most browsers
		 || 'onmsgesturechange' in window; // works on ie10
	}

	if (is_touch_device()) {
		$('body').addClass('touch_device');
	}

	//PAGE TAB
	$(document).on('click', '.pagetab_control_next', function (event) {
		$(this).closest('.pagetab').find('.pagetab_tab_item.active').each(function (index, element) {
			if (!$(element).is(':last-child')) {
				$(element).fadeOut('fast', function () {
					var currentPageTab = $(this).removeClass('active').next().addClass('active').hide().fadeIn('slow').index();
					$(this).closest('.pagetab').find('.pagetab_count_current').val(currentPageTab + 1);
				});
				adjust_content_onleave($(element).closest('.pagetab'));
			}
		});
	});

	$(document).on('click', '.pagetab_control_prev', function (event) {
		$(this).closest('.pagetab').find('.pagetab_tab_item.active').each(function (index, element) {
			if (!$(element).is(':first-child')) {
				$(element).fadeOut('fast', function () {
					var currentPageTab = $(this).removeClass('active').prev().addClass('active').hide().fadeIn('slow').index();
					$(this).closest('.pagetab').find('.pagetab_count_current').val(currentPageTab + 1);
				});
				adjust_content_onleave($(element).closest('.pagetab'));
			}
		});
	});

	$(document).on('change', '.pagetab_count_current', function (event) {
		var value_selected = $(this).val();

		//gets current page
		$(this).closest('.pagetab').each(function (index, element) {
			if (value_selected !== $(element).find('.pagetab_tab_item.active').index() + 1) {
				$(element).find('.pagetab_tab_item.active').fadeOut('fast', function () {
					$(this).removeClass('active').closest('.pagetab_tabs').find('.pagetab_tab_item').eq(value_selected - 1).addClass('active').hide().fadeIn('slow');
				});
			}
		});
	});

	//IMAGEBOX BG

	//Shuffle images in imagebox_bg
	$('.shuffle_children').each(function (index, element) {
		$(element).children().shuffle();
	});

	$(".imagebox_bg").each(function (index, element) {
		animate_bg_images(index, element);
	});

	//IMAGEBOX
	$(".imagebox").each(function (index, element) {
		animate_images(index, element);
	});

	//VIDEOBOX

	$(".videobox").each(function (index, element) {
		animate_video(index, element);
	});

	//pause video (and flash) on changing tabs
	$(document).on('shown.bs.tab','a[data-toggle="tab"]', function (e) {
		adjust_content_onleave($(e.relatedTarget).closest('.tab-pane'));
	});

	$(document).on('click','.panel_tab > .nav > li > a', function (e) {
		adjust_content_onleave($(this).closest('.panel_tab'));
	});

	$(document).on('click', '.videobox_slider', function (event) {
		videobox_click(this);
	});

	$('.modal').on('hidden.bs.modal', function (e) { //prevents video from playing when modal is hidden
		$(this).find('video').each(function (index, element) {
			$(element).get(0).pause();
		});

	});

	// RESET VIDEO STATE ON MODAL CLOSE
	$(document).on('hide.bs.modal', '.modal', function (event) {
		var videoframe = $(this).find('iframe.youtube_iframe');
		if (videoframe.length) {
			var frameSrc = videoframe.attr('src');
			if (frameSrc) {
				videoframe.attr('src', frameSrc.replace('autoplay=true', 'autoplay=false'));
			}
		} else {
			videoframe = $(this).find("video[ng-if='linkMp4']");
			if (videoframe.length && !videoframe[0].paused) {
				videoframe[0].pause();
				videoframe[0].currentTime = 0;
			}
			//            "linkMediahub"  // To do for Mediahub Videos
		}
	});

	//REMOVE ANIMATION FROM IMAGEBOXES AND VIDEOBOXES

	if (NO_ANIMATIONS) {
		add_no_animation_class();
	}

	//FLASHBOX

	//	var flashbox_default_msg='<p>You need to install Adobe Flash Player to see this content.</p><a href="https://get.adobe.com/flashplayer/" target="_blank"><button class="btn_ph2">Install Adobe Flash Player</button></a>';
	//
	//	$('.flashbox').each(function(index, element) {
	//		if(!$(this).hasClass('flashbox_empty')){
	//			$(element).find('.flashbox_swf').html(flashbox_default_msg).flashbox_load();
	//		}
	//	});
	//
	$('div.container-fluid').on('click', '.flashbox', function (event) {
		if (!$(this).hasClass('active') && !$(this).hasClass('flashbox_empty')) {
			$(this).addClass('active').find('.flashbox_cover').fadeOut('fast', function () {
				$(this).siblings('.flashbox_swf').flashbox_play();
			});
		}
	});

	//CIRCLE STRUCTURES
	//level 1 circle
	$('.ratio_container').on('click', '.circle_btn_centre', function (e) {
		$('.circle_block').fadeToggle('fast');
	});

	//level 2 circles

	$('.ratio_container').on('click', '.circle_block .circle_btn_medium', function (e) {
		if (!$(this).hasClass('active')) {
			$('.circle_block_global,.circle_block_process,.circle_block_support').hide();
			$(this).siblings().removeClass('active');
		}
		$(this).toggleClass('active');

		if ($(this).hasClass('circle_btn_global')) {
			$('.circle_block_global').fadeToggle('slow');
		} else if ($(this).hasClass('circle_btn_process')) {
			$('.circle_block_process').fadeToggle('slow');
		} else if ($(this).hasClass('circle_btn_support')) {
			$('.circle_block_support').fadeToggle('slow');
		}
	});

	//level 3 circles
	$('.ratio_container').on('click', '.circle_block_clusters .circle_btn', function (e) {
		if (!$(this).hasClass('active')) {
			$('.circle_block_cluster').hide();
			$(this).siblings().removeClass('active');
		}
		$(this).toggleClass('active');

		if ($(this).hasClass('circle_btn_cluster1')) {
			$('.circle_block_cluster1').fadeToggle('slow');
		} else if ($(this).hasClass('circle_btn_cluster2')) {
			$('.circle_block_cluster2').fadeToggle('slow');
		} else if ($(this).hasClass('circle_btn_cluster3')) {
			$('.circle_block_cluster3').fadeToggle('slow');
		} else if ($(this).hasClass('circle_btn_cluster4')) {
			$('.circle_block_cluster4').fadeToggle('slow');
		}
	});

	//console.log('dashboard repl. external modals');
	replicate_external_modals();

	//P&G Chart
	$(document).on('shown.bs.modal', '.modal', function (event) {
		//check if income id inside
		//var income = document.getElementById("income").getContext("2d");
		/*try{
			var income = $(this).find('#income').get(0).getContext("2d");

			var barData = {
				labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
				datasets : [
					{
						label: "Actual Calls Received",
						fillColor: "rgba(151,187,205,0)",
						strokeColor: "rgba(141,194,233,1)",
						pointColor: "rgba(141,194,233,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: [1771,1471,1235,1070,996,1369,3106,2599,2222,1860,1302,0]
					},
					{
						label: "February Data",
						fillColor: "rgba(151,187,205,0)",
						strokeColor: "rgba(74,255,254,1)",
						pointColor: "rgba(74,255,254,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: [2400,2400,2400,2400,2400,2400,2400,2400,2400,2400,2400,2400]
					},
					{
						label: "February Data",
						fillColor: "rgba(151,187,205,0)",
						strokeColor: "rgba(249,109,28,1)",
						pointColor: "rgba(249,109,28,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: [2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200]
					}
				]
			};

			new Chart(income).Line(barData);
		}catch(err){
			console.log(err);
		}*/

	});


}


function constructURI(URIObj) {
	if(URIObj.DBD_PORT_NUMBER!=undefined || URIObj.DBD_PORT_NUMBER!=""){
		return URIObj.DBD_PROTOCOL + '://' + URIObj.DBD_IP_ADDRESS + ':' + URIObj.DBD_PORT_NUMBER + URIObj.DBD_WS_PATH;
	}else{
		return URIObj.DBD_PROTOCOL + '://' + URIObj.DBD_IP_ADDRESS +  URIObj.DBD_WS_PATH;
	}
}

function constructPostCommentURI(URIObj) {
	if(URIObj.DBD_POST_COMMENT_PORT_NUMBER!=undefined || URIObj.DBD_POST_COMMENT_PORT_NUMBER!="") {
		return URIObj.DBD_PROTOCOL + '://' + URIObj.DBD_IP_ADDRESS + ':' + URIObj.DBD_POST_COMMENT_PORT_NUMBER + URIObj.DBD_WS_PATH_COMMENT;
	}else{
		return URIObj.DBD_PROTOCOL + '://' + URIObj.DBD_IP_ADDRESS + URIObj.DBD_WS_PATH_COMMENT;
	}

}

function constructFileAPIURI(URIObj){
	if(URIObj.DBD_POST_COMMENT_PORT_NUMBER!=undefined || URIObj.DBD_POST_COMMENT_PORT_NUMBER!="") {
		return URIObj.DBD_PROTOCOL + '://' + URIObj.DBD_IP_ADDRESS + ':' + URIObj.DBD_POST_COMMENT_PORT_NUMBER + URIObj.DBD_WS_PATH_FILEAPI;
	}else{
		return URIObj.DBD_PROTOCOL + '://' + URIObj.DBD_IP_ADDRESS + ':' + URIObj.DBD_POST_COMMENT_PORT_NUMBER + URIObj.DBD_WS_PATH_FILEAPI;
	}
}
function cleanURL(currentDeploymentEnv,str){
	//console.log(currentDeploymentEnv.DBD_ENV.indexOf("LIFERAY_"));
	if (currentDeploymentEnv.DBD_ENV.indexOf("LIFERAY_")!=-1) {
		str = str.replaceAll("&" , '#$#');
	}
	//console.log(encodeURIComponent(str))
	return encodeURIComponent(str);

}
// get the parrent URL and it's params
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
		function(m,key,value) {
			vars[key] = value;
		});
	return vars;
}
/// added a custom function for replace all strings
String.prototype.replaceAll = function(str1, str2, ignore)
{
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};

//checking the element is exist in array
function isSupportedAPIVersion(array,apiversion){
	return array.indexOf(apiversion)>-1;
}


function checkDWnameSpace(wsParamObj,namespaceStr){

	if(wsParamObj.dwnamespace.toLowerCase()==DW20_NAMESPACE){
		return namespaceStr.replace(MICROSITE_NAMESPACE,DW20_NAMESPACE);
	}else{
		return namespaceStr;
	}
}
var DEBUG = true;
if(!DEBUG){
	if(!window.console) window.console = {};
	var methods = ["log", "debug", "warn", "info"];
	for(var i=0;i<methods.length;i++){
		console[methods[i]] = function(){};
	}
}

(function () {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}
	());

function add_no_animation_class() {
	$(".videobox_posters,.imagebox_bg_posters").each(function (index, element) {
		$(this).addClass('no_animations');
	});
}

//REPLICATE EXTERNAL MODALS
function replicate_external_modals() {
	$('[data-target=".externalModal"]').each(function (index, element) {
		if ($('.externalModal').length > 0) {
			$('.externalModal').clone().removeClass('externalModal').addClass('externalModal' + (index + 1)).insertAfter('.externalModal');
			$(element).attr('data-target', '.externalModal' + (index + 1));
		}
	});
}

function load_ticker_bottom(element) {
	$(element).carousel();

	//to avoid hiding anything on the page
	$('.wrapper').css('padding-bottom', 100);
}

// to get user language (browser)
var getUserLanguage = function () {
	// get browser default lang
	if (navigator.userLanguage) {
		baseLang = navigator.userLanguage.substring(0, 2).toLowerCase();
	} else {
		baseLang = navigator.language.substring(0, 2).toLowerCase();
	}
	return baseLang;
}

// ANIMATE BACKGROUND IMAGES
var animate_bg_timer = [];
function animate_bg_images(index, element) {
	//if(!NO_ANIMATIONS
	if (!$(element).find('.imagebox_bg_posters').hasClass('no_animations')) {
		var time_transition = 7000;
		var time_display = 9000;

		$(element).data('index', index);
		$(element).find(".imagebox_bg_posters > img").hide().first().show().addClass('active');

		animate_bg_timer[index] = setInterval(function () {
				$(element).find('.imagebox_bg_posters > img.active').each(function (index2, element2) {
					$(element2).fadeOut(time_transition, function () {
						$(element).removeClass('active')
					});
					if (!$(element2).is(':last-child')) {
						$(element2).next().fadeIn(time_transition, function () {
							$(element).addClass('active')
						});
					} else {
						$(element2).siblings().first().fadeIn(time_transition, function () {
							$(element).addClass('active')
						});
					}
				});
			}, time_display);
	}
}

function randomInteger(minNum, maxNum) {
	return minNum + Math.floor(Math.random() * maxNum);
}

$.fn.hasScrollBar = function() {
	return this.get(0).scrollHeight > this.height();
}


//shuffle function
$.fn.shuffle = function () {

	var allElems = this.get(),
	getRandom = function (max) {
		return Math.floor(Math.random() * max);
	},
	shuffled = $.map(allElems, function () {
			var random = getRandom(allElems.length),
			randEl = $(allElems[random]).clone(true)[0];
			allElems.splice(random, 1);
			return randEl;
		});

	this.each(function (i) {
		$(this).replaceWith($(shuffled[i]));
	});

	return $(shuffled);

};

//ANIMATE IMAGES
var animate_images_timer = [];
function animate_images(index, element) {
	if (!NO_ANIMATIONS) {
		var time_transition = 2000;
		var time_display = 2000;

		$(element).data('index', index);
		$(element).find("img").hide().first().show().addClass('active');

		animate_images_timer[index] = setInterval(function () {
				$(element).find('img.active').each(function (index2, element2) {
					$(element2).fadeOut(time_transition, function () {
						$(this).removeClass('active')
					});
					if (!$(element2).is(':last-child')) {
						$(element2).next().fadeIn(time_transition, function () {
							$(this).addClass('active')
						});
					} else {
						$(element2).siblings().first().fadeIn(time_transition, function () {
							$(this).addClass('active')
						});
					}
				});
			}, time_display);
	}
}
function find_index(obj) {
	return $(obj).index;
}

//ANIMATE VIDEO
var animate_video_timer = [];
function animate_video(index, element) {
	if (!NO_ANIMATIONS && !$(element).hasClass('videobox_static')) {
		var time_transition = 2000;
		var time_display = 3000;

		$(element).data('index', index);
		$(element).find(".videobox_posters > img").hide().first().show().addClass('active');

		animate_video_timer[index] = setInterval(function () {
				$(element).find('.videobox_posters > img.active').each(function (index2, element2) {
					$(element2).fadeOut(time_transition, function () {
						$(this).removeClass('active')
					});
					if (!$(element2).is(':last-child')) {
						$(element2).next().fadeIn(time_transition, function () {
							$(this).addClass('active')
						});
					} else {
						$(element2).siblings().first().fadeIn(time_transition, function () {
							$(this).addClass('active')
						});
					}
				});
			}, time_display);
	}
}

//VIDEOBOX CLICK
function videobox_click(obj) {
	if (!$(obj).hasClass('active')) {
		clearInterval(animate_video_timer[$(obj).closest('.videobox').data('index')]);
		$(obj).addClass('active').find('.videobox_posters').fadeOut('slow');

		if (!ONLINE_VIDEOS) { // local videos
			video_open_local(obj);
		} else if (ONLINE_VIDEOS === 1) { //intranet videos
			if ($(obj).closest('.videobox').find('.video_iframe').length > 0) { //has mediahub
				video_open_intranet(obj);
			} else {
				video_open_youtube(obj);
			}
		} else if (ONLINE_VIDEOS === 2) { //internet videos
			if ($(obj).closest('.videobox').find('.youtube_iframe').length > 0) { //has youtube
				video_open_youtube(obj);
			} else {
				video_open_local(obj);
			}
		}
	}
}
function video_open_local(obj) {
	$(obj).closest('.videobox').find('video').each(function (index, element) {
		$(element).css('visibility', 'visible').get(0).play();
		//toggleFullScreen($(element)); //opens local video files in fullscreen mode
	});
}
function video_open_intranet(obj) { //media hub
	$(obj).closest('.videobox').find('.video_iframe').each(function (index, element) {
		$(element).css('visibility', 'visible').attr({
			'src' : $(element).data('src') + '&autoplay=true',
			'seamless' : 1,
			'frameborder' : 0,
			'allowfullscreen' : 1,
			'webkitallowfullscreen' : 1,
			'mozallowfullscreen' : 1

		});
	});
}
function video_open_youtube(obj) { //youtube
	//SAMPLE: <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pXtN4y3O35M?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
	//usage: <iframe class='youtube_iframe' data-src='pXtN4y3O35M'></iframe> -> only include video ID

	var base_url = 'https://www.youtube-nocookie.com/embed/';
	var video_args = '?rel=0&amp;showinfo=0&autoplay=true';

	$(obj).closest('.videobox').find('.youtube_iframe').each(function (index, element) {
		$(element).css('visibility', 'visible').attr({
			'src' : base_url + $(element).data('src') + video_args,
			'frameborder' : 0,
			'allowfullscreen' : 1,
			'webkitallowfullscreen' : 1,
			'mozallowfullscreen' : 1
		});
	});
}

// OPEN VIDEO FULL SCREEN ON CLICK
/* function toggleFullScreen(element) {
for(var i = 0;i < element.length;i++)
{
if (!element[i].fullscreenElement && // alternative standard method
!element[i].mozFullScreenElement && !element[i].webkitFullscreenElement && !element[i].msFullscreenElement)
{ // current working methods
if (element[i].requestFullscreen) {
element[i].requestFullscreen();
} else if (element[i].msRequestFullscreen) {
element[i].msRequestFullscreen();
} else if (element[i].mozRequestFullScreen) {
element[i].mozRequestFullScreen();
} else if (element[i].webkitRequestFullscreen) {
element[i].webkitRequestFullscreen();
}
else if (element[i].webkitEnterFullscreen) {
element[i].webkitEnterFullscreen();
}
} else
{
if (element[i].exitFullscreen) {
element[i].exitFullscreen();
} else if (element[i].msExitFullscreen) {
element[i].msExitFullscreen();
} else if (element[i].mozCancelFullScreen) {
element[i].mozCancelFullScreen();
} else if (element[i].webkitExitFullscreen) {
element[i].webkitExitFullscreen();
}
}
}
} */

//Clean comment for special characters
function cleanComment(currentDeploymentEnv,str){
	//console.log(currentDeploymentEnv.DBD_ENV.indexOf("LIFERAY_"));
	if (currentDeploymentEnv.DBD_ENV.indexOf("LIFERAY_")!=-1) {
		str = str.replaceAll("&" , 'a@@@d');
	}
	str = str.replaceAll("&" , 'a@@@d');
	//console.log(encodeURIComponent(str))
	///return encodeURIComponent(str);
	return str;

}

//FUNCTIONS FOR FLASHBOX

//pause video and flash on leave/hide
function adjust_content_onleave(obj) {
	//if has video
	obj.find('video').each(function (index, element) {
		$(element).get(0).pause();
	});

	//if has video_iframe
	obj.find('.video_iframe,.youtube_iframe').each(function (index, element) {
		$(element).css('visibility', 'hidden');
		$(element).closest('.videobox').find('.videobox_slider').removeClass('active').find('.videobox_posters').show();
	});

	//if has flash
	obj.find('.flashbox.active').each(function (index, element) {
		$(element).find('.flashbox_swf').flashbox_pause();
		$(element).find('.flashbox_cover').show();
		$(element).removeClass('active');
	});
}

$.fn.extend({
	flashbox_play : function () {
		this.flash(
			function () {
			this.Play();
		});
	},

	flashbox_pause : function () {
		this.flash(
			function () {
			this.StopPlay();
		});
	},

	flashbox_restart : function () {
		this.flash(
			function () {
			this.GotoFrame(0);
		});
	},

	flashbox_load : function () {
		var swf_data = this.data('swf');
		this.flash({
			swf : swf_data,
			width : '100%',
			height : 400,
			play : false,
			wmode : 'transparent',
			bgcolor : 'transparent'
		});
	}

});

//MENU CLOSE

function closeMenu() {
	var activeClass = "active";

	$('.mn_menu').removeClass(activeClass);
	$('.menuWrapperLv1').fadeOut(300, function () {
		$('.menuWrapperLv2').fadeOut(300).removeClass(activeClass);
	}).removeClass(activeClass);
	$('.menuOverlay').fadeOut(500);
}

$.fn.extend({
	loadChart : function () {
		if($(this).is(':visible') && !$(this).hasClass('chart_loaded')){
			var type;
			if($(this).hasClass('pieChart')){
				type='pie';
			}else if($(this).hasClass('barChart')){
				type='bar';
			}else if($(this).hasClass('stackedBarChart')){
				type='stacked_bar';
			}else if($(this).hasClass('lineChart')){
				type='line';
			}

			var chartElm = $(this).find('canvas')[0].getContext("2d");

			var chartData = getChartInfo(type,this);

			if(type==='pie'){
				new Chart(chartElm).Pie(chartData.data,chartData.options);
			}else if(type==='line'){
				new Chart(chartElm).Line(chartData.data,chartData.options);
			}else if(type==='bar'){
				new Chart(chartElm).Bar(chartData.data,chartData.options);
			}else if(type==='stacked_bar'){
				new Chart(chartElm).StackedBar(chartData.data,chartData.options);
			}
			$(this).addClass('chart_loaded');
		}
	},
	findChart: function () {
		$(this).find('.chartJS').each(function (index, element) {
			$(element).loadChart();
		});
	}
});

/************************************************************************/
/*BLOCK: Controlling the display of pie charts - START*/
/************************************************************************/

/*inside carousel*/
$(document).on('slid.bs.carousel', '.subway_slides', function (event) {
	$(this).find('.item.active').findChart();
});

$(document).on('slid.bs.carousel', '.card-board', function (event) {
	$(this).find('.item.active').findChart();
});

/*inside tabs*/
$(document).on('click', 'a[data-toggle="tab"]', function (event) {
	$(this).closest('.panel_tab').find('.tab-pane.active').findChart();
});

/*inside pagination*/
/*$(document).on('click', '.pagetab_control', function (event) {
	console.log('click');
	$(this).closest('.pagetab').find('.pagetab_tab_item.active').findChart();
});
$(document).on('change', '.pagetab_count_current', function (event) {
	console.log('change');
	$(this).closest('.pagetab').find('.pagetab_tab_item.active').findChart();
});*/

/*inside accordion*/
$(document).on('shown.bs.collapse', '.accordion', function (event) {
	$(this).find('.panel-collapse.in').findChart();
});

/*inside modals*/
$(document).on('shown.bs.modal', '.modal', function (event) {
	$(this).findChart();
});

/*inside dashboard button*/
$(document).on('click', '.dashboard-icons-nav button', function (event) {
	$('.dashboard-view-graph .item.active').find('.dashboard-tab-graph').findChart();
});

function arrayShuffle(arr) {
	function randOrd() {
		return (Math.round(Math.random()) - 0.5);
	}
	return arr.sort(randOrd);
}

function graphPalette(shuffle_boolean) {
	var gp = ['blue', 'red', 'orange', 'yellow', 'magenta', 'green', 'teal', 'darkBlue', 'darkRed', 'darkOrange', 'darkYellow', 'darkMagenta', 'darkGreen', 'darkTeal', 'darkPurple', 'white', 'black', 'gray', 'purple'];
	if (shuffle_boolean) {
		gp = arrayShuffle(gp);
	}
	return gp;
}




