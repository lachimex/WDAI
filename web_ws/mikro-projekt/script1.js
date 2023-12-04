class Slider {
    constructor(query, opts) {
        this.slider = document.querySelector(query); //element slider
        this.slides = [...this.slider.querySelectorAll(".slider-slide")];
        this.time = null;
        this.currentSlide = Math.max(0, this.slides.findIndex(el => el.classList.contains("is-active")));

        const defaultOpts = {
            pauseTime: 0,
            generateDots: true,
            generatePrevNext: true
        };
        this.options = {...defaultOpts, opts};
        this.autoChangeSlides = typeof this.options.pauseTime === "number" && this.options.pauseTime > 0;
        if (this.options.generatePrevNext) this.createPrevNext();
        if (this.autoChangeSlides) {
            this.handleMouseEnter();
        }
        this.setSlide(this.currentSlide);
    }

    slidePrev() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.setSlide(this.currentSlide);
    }

    slideNext() {
        this.currentSlide++;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }
        this.setSlide(this.currentSlide);
    }

    setSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove("is-active");
        });

        this.slides[index].classList.add("is-active");

        this.currentSlide = index;

        if (this.autoChangeSlides) {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.slideNext(), this.options.pauseTime)
        }
    }

    createPrevNext() {
        this.btnPrev = document.createElement("button");
        this.btnPrev.type = "button";
        this.btnPrev.innerText = "Poprzedni slajd";
        this.btnPrev.classList.add("slider-button", "slider-button-prev");
        this.btnPrev.addEventListener("click", this.slidePrev.bind(this));

        this.btnNext = document.createElement("button");
        this.btnNext.type = "button";
        this.btnNext.innerText = "Następny slajd"
        this.btnNext.classList.add("slider-button", "slider-button-next");
        this.btnNext.addEventListener("click", this.slideNext.bind(this));

        const nav = document.createElement("div");
        nav.classList.add("slider-nav");
        this.slider.append(this.btnPrev);
        this.slider.append(this.btnNext);
        this.slider.append(nav);
    }

    handleMouseEnter() {
        this.slider.addEventListener("mouseenter", () => clearTimeout(this.time));

        this.slider.addEventListener("mouseout", () => {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.slideNext(), 6000);
        })
    }
}

//manualny slider z przyciskami
const options1 = {
    pauseTime : 0,
    generatePrevNext : false,
    generatePagination : false
}
const slide1 = new Slider("#slider1", options1);

function isValidName(name) {
    const nameRegex = /.+\s.+/;
    return nameRegex.test(name);
  }


document.getElementById("name and surname").addEventListener("input", function(){
    const name = this.value;

    if(!isValidName(name)){
        this.setCustomValidity("Proszę podać imię i nazwisko");
    } else{
        this.setCustomValidity("");
    }

})

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

document.getElementById("email").addEventListener("input", function() {
  const email = this.value;
 
  if (!isValidEmail(email)) {
    this.setCustomValidity("Proszę wypełnić adres e-mail poprawnie");
  } else {
    this.setCustomValidity("");
  }
});
