import Carousel from 'react-bootstrap/Carousel';
import person1 from "./images/person1.png";

function Crsl() {
  return (
    <>
      <div className='pt-5'>
        <div className='container pt-5 text-center'>
          <h3>Testimonials</h3>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <Carousel.Caption>
                <div className='p-5'>
                  <blockquote className='justify-content-center'>
                    <p className='pg1'>
                      “Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.”
                    </p>
                  </blockquote>
                  <div className='pt-5'>
                    <img className='img4' src={person1}></img>
                    <h5>Maria Jones</h5>
                    <p className='pg'>CEO, Co-Founder, XYZ Inc.</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <div className='p-5'>
                  <blockquote className='justify-content-center'>
                    <p className='pg1'>
                      “Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.”
                    </p>
                  </blockquote>
                  <div className='pt-5'>
                    <img className='img4' src={person1}></img>
                    <h5>Maria Jones</h5>
                    <p className='pg'>CEO, Co-Founder, XYZ Inc.</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <div className='p-5'>
                  <blockquote className='justify-content-center'>
                    <p className='pg1'>
                      “Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.”
                    </p>
                  </blockquote>
                  <div className='pt-5'>
                    <img className='img4' src={person1}></img>
                    <h5>Maria Jones</h5>
                    <p className='pg'>CEO, Co-Founder, XYZ Inc.</p>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  )
}
export default Crsl;