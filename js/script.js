const Events = (() => {
  const navbar = document.querySelector('.navbar');


  // add class to navbar
  window.addEventListener('scroll', () => {
    let height = document.documentElement.scrollTop || window.pageYOffset;

    (height > 76) ? navbar.classList.add('navbar-change'): navbar.classList.remove('navbar-change');

  })
  // hide preloader
  window.addEventListener('load', () => document.querySelector('.preloader').classList.add('hidePreloader'))
})();

/* Create Data */
const CreateCars = (() => {
  // Car Data
  const cars = [];

  // car class
  class Car {
    constructor(make, country, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.country = country;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
      this.gas = gas;
    }
  }

  // car creation function
  function makeCar(make, country, img = '../img/car-default.jpeg', special = true, model = 'new model', price = 10000, type = 'sedan', trans = 'automatic', gas = '50') {

    const car = new Car(make, country, img, special, model, price, type, trans, gas);

    cars.push(car);
  }

  // produce cars
  function produceCars() {
    makeCar('Ford', 'american', '../img/car-american-1.jpeg', true, 'Mustang-Flat Rock', 22500, 'Sedan', 'Automatic', '60');
    makeCar('Jeep Cherokee', 'american', '../img/car-american-3.jpeg', false, 'Belvidere', 21200, 'SUV', 'automatic', '100');
    makeCar('Chevrolet', 'american', '../img/car-american-2.jpeg', false, 'Corvette-Bowling', 21200, 'sedan', 'automatic', '70');
    makeCar('Porsche', 'german', '../img/car-german-1.jpeg', true, 'Carrera-911', 99200, 'sedan', 'automatic', '65');
    makeCar('Mercedes', 'german', '../img/car-german-2.jpeg', true, 'AMG-GT-Series', 325000, 'sedan', 'automatic', '75');
    makeCar('Audi', 'german', '../img/car-german-3.jpeg', true, 'RS6', 109000, 'hatchback', 'automatic', '75');
    makeCar('Lexus', 'japan', '../img/car-japan-1.jpeg', true, 'ES-2021', 49000, 'sedan', 'automatic', '60');
    makeCar('Honda', 'japan', '../img/car-japan-2.jpeg', false, 'Civic-2022', 21000, 'sedan', 'automatic', '50');
    makeCar('Toyota', 'japan', '../img/car-japan-3.jpeg', false, 'Prius-Prime', 31500, 'sedan', 'automatic', '45');
    makeCar('Hyundai', 'korea', '../img/car-korea-1.jpeg', false, 'Veloster', 30000, 'hatchback', 'automatic', '50');
    makeCar('Genesis', 'korea', '../img/car-korea-2.jpeg', true, 'GV70', 92000, 'suv', 'automatic', '65');
  }
  produceCars();
  // console.log(cars)

  // special cars
  const specialCars = cars.filter((el) => el.special === true);
  // console.log(specialCars);

  return {
    cars,
    specialCars
  }

})();

/* Display Image at Featured-Section */
const DisplaySpecialCars = ((CreateCars) => {
  const specialCars = CreateCars.specialCars;
  // console.log(specialCars);
  const info = document.querySelector('.featured-info');

  // document loaded event
  document.addEventListener('DOMContentLoaded', () => {
    info.innerHTML = '';
    let data = '';
    specialCars.forEach(el => {
      data += `
          <!-- single item -->
          <div class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap">
            <span data-img='${el.img}' class="featured-icon mr-2">
              <i class="fas fa-car"></i>
            </span>
            <h5 class="font-weight-bold mx-1">${el.make}</h5>
            <h5 class="mx-1">${el.model}</h5>
          </div>
          <!-- end of single item -->`
    });
    info.innerHTML = data;

    // Change Img
    info.addEventListener('click', (event) => {
      if (event.target.parentElement.classList.contains('featured-icon')) {
        const img = event.target.parentElement.dataset.img;
        document.querySelector('.featured-photo').src = img;
      }
    });
  })

})(CreateCars);

/* Display all cars at Inventory-Section */
const DisplayCars = ((CreateCars) => {
  // All Cars
  const cars = CreateCars.cars;

  // Cars container
  const inventory = document.querySelector('.inventory-container');

  // CarContent Loaded
  document.addEventListener('DOMContentLoaded', () => {
    inventory.innerHTML = '';
    let output = '';

    cars.forEach((el) => {
      output += `        
      <!-- single car -->
        <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${el.country}">
          <div class="card car-card">
            <img src="${el.img}" class="card-img-top car-img" alt="">
            <!-- card body -->
            <div class="card-body">
              <div class="car-info d-flex justify-content-between">
                <!-- first flex child -->
                <div class="car-text text-uppercase">
                  <h6 class="font-weight-bold">${el.make}</h6>
                  <h6>${el.model}</h6>
                </div>
                <!-- second flex child -->
                <h5 class="car-value align-self-center py-2 px-3">$
                  <span class="car-price">${el.price}</span>
                </h5>
              </div>
            </div>
            <!-- end of card -->
            <div class="card-footer text-capitalize d-flex justify-content-between">
              <p><span><i class="fas fa-car"></i></span> ${el.type}</p>
              <p><span><i class="fas fa-cogs"></i></span> ${el.trans}</p>
              <p><span><i class="fas fa-gas-pump"></i></span> ${el.gas}</p>
            </div>
          </div>
        </div>
        <!--end of single car -->`
    });
    inventory.innerHTML = output;
  })

})(CreateCars);

/* filter cars at Inventory-Section */
const filterCars = (() => {
  const filter = document.querySelectorAll('.filter-btn');
  filter.forEach((el) => {
    el.addEventListener('click', (event) => {
      const value = event.target.dataset.filter;
      const singleCar = document.querySelectorAll('.single-car');
      singleCar.forEach((el) => {
        if (value === 'all') {
          el.style.display = 'block';
        } else {
          (!el.classList.contains(value)) ? el.style.display = 'none': el.style.display = 'block'
        }
      })
    })
  })
})();


/* Gallery-Section  */
// show modal
const Gallery = (() => {
  // all items
  const items = document.querySelectorAll('.gallery-item');
  // modal
  const showcase = document.querySelector('.showcase');

  items.forEach(item => {
    item.addEventListener('click', (event) => {
      showcase.classList.add('showcase-show');
      if (event.target.classList.contains('gallery-item')) {
        let src = event.target.childNodes[1].src;
        document.querySelector('.showcase-img').src = src;


      }
    })
  })
  // close modal
  document.querySelector('.showcase-close').addEventListener('click', () => {
    showcase.classList.remove('showcase-show')
  })

})();


/*  vertical scrolling  */
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(link => {
  link.addEventListener("click", e => {
    // prevent default
    e.preventDefault();
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    //
    let position = element.offsetTop - 62;

    window.scrollTo({
      left: 0,
      top: element.offsetTop,
      top: position,
      behavior: "smooth"
    });
  });
});


/*  contact section */
const submit = document.querySelector('.contact-btn');
const inputEmail = document.querySelector('.contact-input');
submit.addEventListener('click', massage);

function massage(event) {
  event.preventDefault();
  let valueEmail = inputEmail.value;
  console.log(valueEmail);
  if (valueEmail === '') {
    swal("Oops!", "Double Check Your Data.", "error");
    inputEmail.value = '';
  } else {
    swal("Done!", "Your Email was sent.", "success");
    inputEmail.value = '';
  }
}