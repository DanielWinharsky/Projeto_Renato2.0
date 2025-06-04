// Existing code block
document.addEventListener("DOMContentLoaded", () => {
  // Scroll Reveal Animation
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".scroll-reveal, .book-item, .featured-content, .featured-video, .contact-content, .biography-content, .stat-item",
    )

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    revealElements.forEach((element) => {
      element.classList.add("scroll-reveal")
      revealObserver.observe(element)
    })
  }

  // Melhorar a funcionalidade do menu mobile:
  function enhanceMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle")
    const navList = document.querySelector(".nav-list")

    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true"

        navList.classList.toggle("active")
        menuToggle.setAttribute("aria-expanded", !isExpanded)

        // Toggle animation for menu icon
        const spans = menuToggle.querySelectorAll("span")
        spans.forEach((span) => span.classList.toggle("active"))

        if (navList.classList.contains("active")) {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
          spans[1].style.opacity = "0"
          spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
          document.body.style.overflow = "hidden"
        } else {
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
          document.body.style.overflow = ""
        }
      })
    }
  }

  // Adicionar funcionalidade de newsletter aprimorada:
  function enhanceNewsletterForm() {
    const newsletterForms = document.querySelectorAll(".newsletter-form-enhanced")

    if (newsletterForms.length > 0) {
      newsletterForms.forEach((form) => {
        form.addEventListener("submit", function (e) {
          e.preventDefault()

          const email = this.querySelector('input[type="email"]').value.trim()
          const button = this.querySelector("button")
          const originalText = button.innerHTML

          if (!email || !isValidEmail(email)) {
            showNotification("Por favor, insira um email válido.", "error")
            return
          }

          // Simulate subscription with loading state
          button.disabled = true
          button.innerHTML = `
            <div class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
            <span>Inscrevendo...</span>
          `

          setTimeout(() => {
            showNotification("Inscrição realizada com sucesso! 🎉", "success")
            this.reset()
            button.disabled = false
            button.innerHTML = originalText
          }, 2000)
        })
      })
    }
  }

  // Sistema de notificações:
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Fechar notificação">×</button>
      </div>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "var(--success-color)" : type === "error" ? "var(--error-color)" : "var(--primary-color)"};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
      font-family: var(--font-family-primary);
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Close functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    })

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = "translateX(100%)"
        setTimeout(() => notification.remove(), 300)
      }
    }, 5000)
  }

  // Melhorar performance com lazy loading:
  function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]')

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          // Simulate loading real images
          img.style.filter = "blur(5px)"
          setTimeout(() => {
            img.style.filter = "none"
            img.style.transition = "filter 0.3s ease"
          }, 500)
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // Adicionar smooth scroll personalizado:
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          // Close mobile menu if open
          const navList = document.querySelector(".nav-list")
          const menuToggle = document.querySelector(".menu-toggle")

          if (navList.classList.contains("active")) {
            navList.classList.remove("active")
            menuToggle.setAttribute("aria-expanded", "false")
            document.body.style.overflow = ""

            const spans = menuToggle.querySelectorAll("span")
            spans.forEach((span) => span.classList.remove("active"))
            spans[0].style.transform = "none"
            spans[1].style.opacity = "1"
            spans[2].style.transform = "none"
          }

          // Smooth scroll to target
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetElement.offsetTop - headerHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Inicializar todas as funcionalidades aprimoradas:
  initScrollReveal()
  enhanceMobileMenu()
  enhanceNewsletterForm()
  initLazyLoading()
  initSmoothScroll()

  // Theme Management
  const themeToggle = document.querySelector(".theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Get saved theme or default to system preference
  const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light")

  // Apply initial theme
  document.documentElement.setAttribute("data-theme", currentTheme)

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)

      // Add a subtle animation to the toggle
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  }

  // Header scroll effect
  const header = document.querySelector(".header")
  const scrollThreshold = 50

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navList = document.querySelector(".nav-list")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active")

      // Toggle animation for menu icon
      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))

      if (navList.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navList.classList.contains("active") &&
      !event.target.closest(".nav") &&
      !event.target.closest(".menu-toggle")
    ) {
      navList.classList.remove("active")

      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.remove("active"))
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Books carousel functionality
  const carouselTrack = document.querySelector(".carousel-track")
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const prevButton = document.querySelector(".carousel-button.prev")
  const nextButton = document.querySelector(".carousel-button.next")
  const indicators = document.querySelectorAll(".indicator")

  if (carouselTrack && carouselSlides.length > 0) {
    let currentIndex = 0
    const slideWidth = 100 // percentage

    // Set initial position
    carouselTrack.style.transform = `translateX(0%)`

    // Update carousel position
    function updateCarousel() {
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })
    }

    // Next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % carouselSlides.length
      updateCarousel()
    }

    // Previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length
      updateCarousel()
    }

    // Event listeners for buttons
    if (nextButton) {
      nextButton.addEventListener("click", nextSlide)
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide)
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index
        updateCarousel()
      })
    })

    // Auto slide (optional)
    let autoSlideInterval = setInterval(nextSlide, 5000)

    // Pause auto slide on hover
    carouselTrack.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval)
    })

    carouselTrack.addEventListener("mouseleave", () => {
      autoSlideInterval = setInterval(nextSlide, 5000)
    })

    // Touch events for mobile swipe
    let touchStartX = 0
    let touchEndX = 0

    carouselTrack.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    carouselTrack.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide() // Swipe left
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide() // Swipe right
      }
    }
  }

  // Testimonial slider functionality
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonials = document.querySelectorAll(".testimonial")

  if (testimonialTrack && testimonials.length > 0) {
    let currentTestimonial = 0

    function showNextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`
    }

    // Auto rotate testimonials
    setInterval(showNextTestimonial, 6000)
  }

  // Video player functionality
  const videoPlaceholder = document.querySelector(".video-placeholder")

  if (videoPlaceholder) {
    videoPlaceholder.addEventListener("click", function () {
      const videoContainer = this.closest(".video-container")
      const videoId = "YOUR_YOUTUBE_VIDEO_ID" // Replace with actual YouTube video ID

      const iframe = document.createElement("iframe")
      iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`)
      iframe.setAttribute("frameborder", "0")
      iframe.setAttribute("allowfullscreen", "")
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      )
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.style.position = "absolute"
      iframe.style.top = "0"
      iframe.style.left = "0"

      videoContainer.style.paddingBottom = "56.25%" // 16:9 aspect ratio
      videoContainer.style.position = "relative"
      videoContainer.innerHTML = ""
      videoContainer.appendChild(iframe)
    })
  }

  // Form submission with validation
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simple validation
      const name = this.querySelector("#name").value.trim()
      const email = this.querySelector("#email").value.trim()
      const message = this.querySelector("#message").value.trim()

      if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos.")
        return
      }

      if (!isValidEmail(email)) {
        alert("Por favor, insira um email válido.")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector(".submit-button")
      submitButton.disabled = true
      submitButton.textContent = "Enviando..."

      setTimeout(() => {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
        this.reset()
        submitButton.disabled = false
        submitButton.textContent = "Enviar Mensagem"
      }, 1500)
    })
  }

  // Newsletter form submission
  const newsletterForms = document.querySelectorAll(".newsletter-form")

  if (newsletterForms.length > 0) {
    newsletterForms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()

        const email = this.querySelector('input[type="email"]').value.trim()

        if (!email || !isValidEmail(email)) {
          alert("Por favor, insira um email válido.")
          return
        }

        // Simulate subscription
        const button = this.querySelector("button")
        const originalText = button.textContent
        button.disabled = true
        button.textContent = "Inscrevendo..."

        setTimeout(() => {
          alert("Inscrição realizada com sucesso!")
          this.reset()
          button.disabled = false
          button.textContent = originalText
        }, 1500)
      })
    })
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (navList.classList.contains("active")) {
          navList.classList.remove("active")

          const spans = menuToggle.querySelectorAll("span")
          spans.forEach((span) => span.classList.remove("active"))
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(
    ".book-item, .featured-content, .featured-video, .contact-content, .biography-content",
  )

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("reveal-text")
      }
    })
  }

  // Initial check
  revealOnScroll()

  // Check on scroll
  window.addEventListener("scroll", revealOnScroll)
})

// Custom Video Player Functionality
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("mainVideo")
  const videoContainer = document.querySelector(".custom-video-player")
  const videoIntro = document.getElementById("videoIntro")
  const playButtonLarge = document.getElementById("playButtonLarge")
  const videoControls = document.getElementById("videoControls")
  const playPauseBtn = document.getElementById("playPauseBtn")
  const progressBar = document.getElementById("progressBar")
  const progressFilled = document.getElementById("progressFilled")
  const progressHandle = document.getElementById("progressHandle")
  const currentTimeSpan = document.getElementById("currentTime")
  const durationSpan = document.getElementById("duration")
  const volumeBtn = document.getElementById("volumeBtn")
  const volumeSlider = document.getElementById("volumeSlider")
  const volumeFilled = document.getElementById("volumeFilled")
  const volumeHandle = document.getElementById("volumeHandle")
  const fullscreenBtn = document.getElementById("fullscreenBtn")
  const loadingSpinner = document.getElementById("loadingSpinner")

  if (!video) return

  let isPlaying = false
  let isDraggingProgress = false
  let isDraggingVolume = false
  let controlsTimeout

  // Initialize player
  function initializePlayer() {
    video.volume = 1
    updateVolumeDisplay()

    // Set up event listeners
    setupEventListeners()

    // Load video metadata
    if (video.readyState >= 1) {
      updateDuration()
    }
  }

  function setupEventListeners() {
    // Large play button
    playButtonLarge.addEventListener("click", togglePlay)

    // Play/Pause button
    playPauseBtn.addEventListener("click", togglePlay)

    // Video events
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("ended", onEnded)
    video.addEventListener("waiting", showLoading)
    video.addEventListener("canplay", hideLoading)
    video.addEventListener("loadstart", showLoading)

    // Progress bar
    progressBar.addEventListener("mousedown", startProgressDrag)
    progressBar.addEventListener("click", seekVideo)

    // Volume controls
    volumeBtn.addEventListener("click", toggleMute)
    volumeSlider.addEventListener("mousedown", startVolumeDrag)
    volumeSlider.addEventListener("click", setVolume)

    // Fullscreen
    fullscreenBtn.addEventListener("click", toggleFullscreen)

    // Mouse events for controls
    videoContainer.addEventListener("mouseenter", showControls)
    videoContainer.addEventListener("mouseleave", hideControlsDelayed)
    videoContainer.addEventListener("mousemove", showControls)

    // Global mouse events for dragging
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    // Keyboard controls
    document.addEventListener("keydown", handleKeyboard)

    // Click on video to play/pause
    video.addEventListener("click", togglePlay)
  }

  function togglePlay() {
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  function onPlay() {
    isPlaying = true
    videoContainer.classList.add("playing")
    updatePlayButton()
  }

  function onPause() {
    isPlaying = false
    videoContainer.classList.remove("playing")
    updatePlayButton()
  }

  function onEnded() {
    isPlaying = false
    videoContainer.classList.remove("playing")
    videoIntro.style.opacity = "1"
    videoIntro.style.pointerEvents = "auto"
    updatePlayButton()
  }

  function updatePlayButton() {
    const playIcon = playPauseBtn.querySelector(".play-icon")
    const pauseIcon = playPauseBtn.querySelector(".pause-icon")

    if (isPlaying) {
      playIcon.style.display = "none"
      pauseIcon.style.display = "block"
    } else {
      playIcon.style.display = "block"
      pauseIcon.style.display = "none"
    }
  }

  function updateDuration() {
    if (video.duration) {
      durationSpan.textContent = formatTime(video.duration)
    }
  }

  function updateProgress() {
    if (!isDraggingProgress && video.duration) {
      const progress = (video.currentTime / video.duration) * 100
      progressFilled.style.width = progress + "%"
      currentTimeSpan.textContent = formatTime(video.currentTime)
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  function startProgressDrag(e) {
    isDraggingProgress = true
    seekVideo(e)
  }

  function seekVideo(e) {
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * video.duration

    if (newTime >= 0 && newTime <= video.duration) {
      video.currentTime = newTime
      const progress = (newTime / video.duration) * 100
      progressFilled.style.width = progress + "%"
      currentTimeSpan.textContent = formatTime(newTime)
    }
  }

  function toggleMute() {
    if (video.muted) {
      video.muted = false
      video.volume = video.volume || 0.5
    } else {
      video.muted = true
    }
    updateVolumeDisplay()
  }

  function startVolumeDrag(e) {
    isDraggingVolume = true
    setVolume(e)
  }

  function setVolume(e) {
    const rect = volumeSlider.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

    video.volume = pos
    video.muted = false
    updateVolumeDisplay()
  }

  function updateVolumeDisplay() {
    const volume = video.muted ? 0 : video.volume
    volumeFilled.style.width = volume * 100 + "%"

    // Update volume icon
    const icons = volumeBtn.querySelectorAll("svg")
    icons.forEach((icon) => (icon.style.display = "none"))

    if (video.muted || volume === 0) {
      volumeBtn.querySelector(".volume-mute").style.display = "block"
    } else if (volume < 0.3) {
      volumeBtn.querySelector(".volume-low").style.display = "block"
    } else if (volume < 0.7) {
      volumeBtn.querySelector(".volume-medium").style.display = "block"
    } else {
      volumeBtn.querySelector(".volume-high").style.display = "block"
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        console.log("Error attempting to enable fullscreen:", err)
      })
    } else {
      document.exitFullscreen()
    }
  }

  function showControls() {
    videoControls.classList.add("show")
    clearTimeout(controlsTimeout)
  }

  function hideControlsDelayed() {
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        videoControls.classList.remove("show")
      }
    }, 2000)
  }

  function showLoading() {
    videoContainer.classList.add("loading")
  }

  function hideLoading() {
    videoContainer.classList.remove("loading")
  }

  function handleMouseMove(e) {
    if (isDraggingProgress) {
      seekVideo(e)
    } else if (isDraggingVolume) {
      setVolume(e)
    }
  }

  function handleMouseUp() {
    isDraggingProgress = false
    isDraggingVolume = false
  }

  function handleKeyboard(e) {
    if (e.target.tagName.toLowerCase() === "input") return

    switch (e.code) {
      case "Space":
        e.preventDefault()
        togglePlay()
        break
      case "ArrowLeft":
        e.preventDefault()
        video.currentTime = Math.max(0, video.currentTime - 10)
        break
      case "ArrowRight":
        e.preventDefault()
        video.currentTime = Math.min(video.duration, video.currentTime + 10)
        break
      case "ArrowUp":
        e.preventDefault()
        video.volume = Math.min(1, video.volume + 0.1)
        updateVolumeDisplay()
        break
      case "ArrowDown":
        e.preventDefault()
        video.volume = Math.max(0, video.volume - 0.1)
        updateVolumeDisplay()
        break
      case "KeyM":
        e.preventDefault()
        toggleMute()
        break
      case "KeyF":
        e.preventDefault()
        toggleFullscreen()
        break
    }
  }

  // Update fullscreen button icon
  document.addEventListener("fullscreenchange", () => {
    const enterIcon = fullscreenBtn.querySelector(".fullscreen-enter")
    const exitIcon = fullscreenBtn.querySelector(".fullscreen-exit")

    if (document.fullscreenElement) {
      enterIcon.style.display = "none"
      exitIcon.style.display = "block"
    } else {
      enterIcon.style.display = "block"
      exitIcon.style.display = "none"
    }
  })

  // Initialize the player
  initializePlayer()
})
