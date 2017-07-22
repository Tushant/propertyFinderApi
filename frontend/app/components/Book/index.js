import React from "react";
import star from "assets/img/Star.svg";
import star_blank from "assets/img/star_blank.svg";
import img1 from "assets/img/img1.jpg";
import img2 from "assets/img/img2.jpg";
import img3 from "assets/img/img3.jpg";
import img4 from "assets/img/img4.jpg";

const Book = () => {
  return (
    <section className="booking-info">
      <div className="container">
        {/* <div className="align-center mg-btm-60">
          <div className="largeFont">Best Price.Guarenteed </div>
          <p className="lead">
            We guarantee the lowest price on everything you book.
          </p>
          <a className="bold" href="#">Learn More</a>
        </div> */}
        <div className="mg-btm-md">
          <h3>Just Booked</h3>
          <div className="four column grid">
            <div className="column book-hotel-card">
              <img className="img-responsive thumb" src={img1} alt="img1" />
              <div className="after" />
              <span className="price">$236</span>
              <h5>Four Season Hotel</h5>
              <div className="clearfix">
                <div className="rating">
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star_blank} alt="blank star" />
                </div>
                <div className="reviews">
                  96 reviews
                </div>
              </div>
          </div>
            <div className="column book-hotel-card">
              <img className="img-responsive thumb" src={img2} alt="img2" />
              <div className="after" />
              <span className="price">$136</span>
              <h5>Silicon Valley Inn</h5>
              <div className="clearfix">
                <div className="rating">
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star_blank} alt="blank_star" />
                </div>
                <div className="reviews">
                  16 reviews
                </div>
              </div>
            </div>
            <div className="column book-hotel-card">
              <img className="img-responsive thumb" src={img3} alt="img3" />
              <div className="after" />
              <span className="price">$96</span>
              <h5>Mountain View Inn</h5>
              <div className="clearfix">
                <div className="rating">
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star_blank} alt="blank_star" />
                </div>
                <div className="reviews">
                  9 reviews
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default Book;
