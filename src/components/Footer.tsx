import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className=" bg-dark-1 pt-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="flex w-full flex-col justify-center px-4 py-10 lg:w-4/12">
            <div className="px-4">
              {/* Logo in footer */}
              <div className="flex w-full items-center">
                <a className="hidden phone:flex" href="#">
                  <img src="/logo-blue.webp" alt="logo" className="w-15 h-20" />
                </a>
                <a href="#" className="item-center pl-2 pt-3">
                  <div className="whitespace-nowrap text-2xl text-white">
                    NGUYEN'S HOME
                  </div>
                  <div className="flex justify-center">
                    <div className="text-base/3 text-white">FURNITURE</div>
                  </div>
                </a>
              </div>
              {/* Follow us */}
              <div className="mt-6 flex  items-center justify-start lg:mb-0">
                <div className="hidden items-center pr-3 text-lg font-normal text-white phone:flex">
                  FOLLOW US:
                </div>
                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/sang1833/DoAn1_20521767_20521833"
                    )
                  }
                  className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-dark-1 font-normal outline-none focus:outline-none"
                  type="button"
                >
                  {/* <i className="fab fa-facebook text-xl text-white"></i> */}
                  <FontAwesomeIcon icon={faFacebook} className="text-white" />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/sang1833/DoAn1_20521767_20521833"
                    )
                  }
                  className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-dark-1 font-normal outline-none focus:outline-none"
                  type="button"
                >
                  {/* <i className="fa-brands fa-instagram text-xl text-white"></i> */}
                  <FontAwesomeIcon icon={faInstagram} className="text-white" />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/sang1833/DoAn1_20521767_20521833"
                    )
                  }
                  className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-dark-1 font-normal outline-none focus:outline-none"
                  type="button"
                >
                  {/* <i className="fa-brands fa-google text-xl text-white"></i> */}
                  <FontAwesomeIcon icon={faGoogle} className="text-white" />
                </button>
                <button
                  className="align-center mr-2 h-10 w-10 items-center justify-center rounded-full bg-dark-1 font-normal outline-none focus:outline-none"
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://github.com/sang1833/DoAn1_20521767_20521833"
                    )
                  }
                >
                  {/* <i className="fab fa-github text-xl text-white"></i> */}
                  <FontAwesomeIcon icon={faGithub} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          {/* Nav bar summary */}
          <div className="flex w-full flex-col justify-center px-4 py-10 lg:w-4/12">
            <div>
              <div className="ml-auto w-full px-4">
                <span className="mb-2 block whitespace-nowrap text-lg font-semibold text-white">
                  NGUYEN'S HOME Furniture
                </span>
                <ul className="list-unstyled pt-3">
                  <li>
                    <Link
                      className="block pb-2 text-white hover:text-primary-1"
                      to={"/product"}
                    >
                      Sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-white hover:text-primary-1"
                      to={"/blog/news"}
                    >
                      Góc cảm hứng
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-white hover:text-primary-1"
                      to={"/service"}
                    >
                      Dịch vụ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block pb-2 text-white hover:text-primary-1"
                      to={"/aboutus"}
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Send Email */}
          <div className="w-full px-4 py-10 lg:w-4/12">
            <div className="flex flex-col justify-center px-4 py-6">
              <div className="mb-6 md:mb-6 md:ml-auto">
                <p className="text-justify text-base text-white">
                  <span>
                    Để lại email của bạn để có thể liên tục cập nhật những ý
                    tưởng trang trí mới, cũng như sản phẩm và các thông tin ưu
                    đãi từ NGUYEN’S HOME
                  </span>
                </p>
              </div>
              <form action="">
                <div className="flex flex-row">
                  <div
                    className="relative w-full md:mb-6"
                    data-te-input-wrapper-init
                  >
                    <input
                      type="email"
                      className="focus:border-primary focus:shadow-te-primary peer m-0 block h-[58px] w-full bg-white bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-dark-1 ease-in-out placeholder:text-transparent focus:bg-white focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-dark-1 focus:outline-none [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                      id="floatingInput"
                      placeholder="email"
                    />
                    <label
                      htmlFor="floatingInput"
                      className="pointer-events-none absolute left-0 top-0 origin-[0_0] whitespace-nowrap border border-solid border-transparent px-3 py-4 text-primary-1 transition-[opacity,_transform] duration-100 ease-in-out peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none"
                    >
                      Email của bạn
                    </label>
                  </div>

                  <div className="pl-3 md:mr-auto">
                    <button className="first-letter: left-3 top-0 mb-0 inline-block h-[58px] max-h-[58px] w-full max-w-[100%] whitespace-nowrap bg-primary-1 px-4 py-2 font-bold leading-[1.6] text-white hover:bg-black">
                      ĐĂNG KÝ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Add comment below if you want to make footer bigger */}

          {/* <hr className="my-6 border-white"/>
                    <div 
                        className="flex flex-wrap items-center md:justify-between justify-center">
                    </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
