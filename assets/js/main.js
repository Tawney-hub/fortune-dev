/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict"; // Enforces stricter parsing and error handling in JavaScript.

  /**
   * ## Header Toggler
   * Manages the visibility of the header and changes the toggle icon.
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show'); // Toggles the 'header-show' class on the header.
    headerToggleBtn.classList.toggle('bi-list'); // Toggles the 'list' icon.
    headerToggleBtn.classList.toggle('bi-x'); // Toggles the 'x' icon.
  }

  // Event listener for clicking the header toggle button.
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * ## Hide Mobile Navigation on Same-Page/Hash Links
   * Closes the mobile navigation when a link pointing to the same page (hash link) is clicked.
   */
  document.querySelectorAll('#navmenu a').forEach(navmenuLink => {
    navmenuLink.addEventListener('click', () => {
      // If the header is currently showing (mobile nav is open), close it.
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * ## Toggle Mobile Navigation Dropdowns
   * Manages the opening and closing of dropdown menus in the mobile navigation.
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior.
      this.parentNode.classList.toggle('active'); // Toggles 'active' class on the parent list item.
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active'); // Toggles 'dropdown-active' on the immediate sibling (the dropdown content).
      e.stopImmediatePropagation(); // Stops the event from bubbling up and triggering other listeners.
    });
  });

  /**
   * ## Preloader
   * Removes the preloader element once the entire page has loaded.
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove(); // Removes the preloader from the DOM.
    });
  }

  /**
   * ## Scroll Top Button
   * Shows or hides a "scroll to top" button based on scroll position and handles its click event.
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      // Adds 'active' class if scrolled more than 100px, otherwise removes it.
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  // Event listener for clicking the scroll top button.
  if (scrollTop) { // Ensure scrollTop exists before adding listener
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior.
      window.scrollTo({
        top: 0, // Scroll to the top of the page.
        behavior: 'smooth' // Smooth scrolling animation.
      });
    });
  }

  // Attach event listeners for scroll top button visibility.
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * ## Animation on Scroll (AOS)
   * Initializes the AOS library for elements with scroll-triggered animations.
   */
  function aosInit() {
    AOS.init({
      duration: 600, // Animation duration in milliseconds.
      easing: 'ease-in-out', // Easing function for animations.
      once: true, // Whether animation should happen only once - while scrolling down.
      mirror: false // Whether elements should animate out while scrolling past them.
    });
  }

  // Initialize AOS when the page loads.
  window.addEventListener('load', aosInit);

  /**
   * ## Typed.js Initialization
   * Initializes the Typed.js library for animating text strings.
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(','); // Splits the string by commas into an array.
    new Typed('.typed', {
      strings: typed_strings, // Array of strings to type.
      loop: true, // Loop the typing animation indefinitely.
      typeSpeed: 100, // Typing speed in milliseconds.
      backSpeed: 50, // Backspacing speed in milliseconds.
      backDelay: 2000 // Delay before starting to backspace.
    });
  }

  /**
   * ## Pure Counter Initialization
   * Initializes the Pure Counter library for animated number counting.
   */
  // Checks if PureCounter is available globally before initializing.
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }


  /**
   * ## Animate Skills Items on Reveal (using Waypoints)
   * Animates the progress bars within skill sections when they come into view.
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    // Checks if Waypoint is available globally before initializing.
    if (typeof Waypoint !== 'undefined') {
      new Waypoint({
        element: item, // The element to trigger the waypoint.
        offset: '80%', // When 80% of the element is visible.
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'; // Sets the width based on 'aria-valuenow'.
          });
        }
      });
    }
  });

  /**
   * ## GLightbox Initialization
   * Initializes the GLightbox library for creating responsive lightboxes.
   */
  // Checks if GLightbox is available globally before initializing.
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox' // Selector for elements that should open in the lightbox.
    });
  }

  /**
   * ## Isotope Layout and Filters Initialization
   * Initializes Isotope for filtering and sorting grid layouts.
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry'; // Get layout mode, default to 'masonry'.
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*'; // Get default filter, default to all.
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order'; // Get sort order, default to original.

    let initIsotope;
    // Ensures images are loaded before initializing Isotope to prevent layout issues.
    // Checks if imagesLoaded is available globally before calling.
    if (typeof imagesLoaded !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        // Checks if Isotope is available globally before initializing.
        if (typeof Isotope !== 'undefined') {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item', // Selector for grid items.
            layoutMode: layout, // Layout mode (e.g., 'masonry', 'fitRows').
            filter: filter, // Initial filter.
            sortBy: sort // Initial sort order.
          });
        }
      });
    }


    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active'); // Remove active class from previous filter.
        this.classList.add('filter-active'); // Add active class to current filter.
        initIsotope.arrange({
          filter: this.getAttribute('data-filter') // Apply the new filter.
        });
        // Re-initialize AOS to animate newly visible items after filtering.
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * ## Swiper Sliders Initialization
   * Initializes Swiper.js for carousels and sliders.
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      // Attempt to parse Swiper configuration from a script tag.
      try {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        // Handle custom pagination for "swiper-tab" class (if applicable).
        if (swiperElement.classList.contains("swiper-tab")) {
          // This function (initSwiperWithCustomPagination) is not provided in your original code.
          // You would need to define it if you have custom pagination logic.
          // For now, it's commented out or would need to be implemented.
          // initSwiperWithCustomPagination(swiperElement, config);
          new Swiper(swiperElement, config); // Fallback to standard Swiper if custom pagination isn't defined.
        } else {
          // Checks if Swiper is available globally before initializing.
          if (typeof Swiper !== 'undefined') {
            new Swiper(swiperElement, config);
          }
        }
      } catch (error) {
        console.error("Error parsing Swiper config:", error);
      }
    });
  }

  // Initialize Swiper sliders when the page loads.
  window.addEventListener("load", initSwiper);

  /**
   * ## Correct Scrolling Position for Hash Links
   * Adjusts scroll position on page load if the URL contains a hash (e.g., #section-id).
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop; // Get CSS scroll-margin-top.
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop), // Adjust scroll position for fixed headers/navs.
            behavior: 'smooth'
          });
        }, 100); // Small delay to ensure all elements are rendered.
      }
    }
  });

  /**
   * ## Navigation Menu Scrollspy
   * Highlights the active navigation link based on the current scroll position.
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return; // Skip if no hash.
      let section = document.querySelector(navmenulink.hash);
      if (!section) return; // Skip if section not found.

      // Adjust position for a bit of offset, useful for fixed headers.
      let position = window.scrollY + 200;

      // Check if the current scroll position is within the section's bounds.
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        // Remove 'active' from all currently active links.
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active'); // Add 'active' to the current section's link.
      } else {
        navmenulink.classList.remove('active'); // Remove 'active' if not in the section.
      }
    });
  }

  // Attach scrollspy listeners.
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();