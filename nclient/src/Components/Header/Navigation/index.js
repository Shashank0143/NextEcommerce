import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MyContext } from "@/context/ThemeContext";
import CountryDropdown from "@/Components/CountryDropdown";
import Link from "next/link";
import { RiLogoutCircleRFill } from "react-icons/ri";
import Logo from '../../../assets/images/logo.jpg'
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navigation = (props) => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenSubMenuIndex, setIsOpenSubMenuIndex] = useState(null);
  const [isOpenSubMenu_, setIsOpenSubMenu_] = useState(false);

  const context = useContext(MyContext);
  const history = useRouter();

  useEffect(() => {
    setIsOpenNav(props.isOpenNav);
  }, [props.isOpenNav]);

  const IsOpenSubMenu = (index) => {
    setIsOpenSubMenuIndex(index);
    setIsOpenSubMenu_(!isOpenSubMenu_);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("location");
    context.setIsLogin(false);
    // window.location.href = "/signIn"
    history("/signIn");
  };

  return (
    <>
    <nav>
      <div className="container mt-2">
        <div className="row">
          <div
            className={`col-sm-10 navPart2 d-flex align-items-center res-nav-wrapper ${
              isOpenNav === true ? "open" : "close"
            }`}
          >
            <div className="res-nav-overlay" onClick={props.closeNav}></div>

            <div className="res-nav">
              {context.windowWidth < 992 && (
                <div className="pl-3">
                  <Link href="/" className="logo">
                    <Image src={Logo} alt="logo" width={100} height={130} priority="true"/>
                  </Link>
                </div>
              )}

              <ul className="list list-inline ml-auto">
                {context.windowWidth < 992 && (
                  <>
                    <li className="list-inline-item">
                      <div className="p-3">
                        {context.countryList.length !== 0 &&
                          context.windowWidth < 992 && <CountryDropdown />}
                      </div>
                    </li>
                  </>
                )}
                {props.navData
                  .filter((item, idx) => idx < 8)
                  .map((item, index) => {
                    return (
                      <li key={index} className="list-inline-item">
                        <Link
                          href={`/category/${item?.slug}`}
                          onClick={props.closeNav}
                        >
                          <Button>
                            {" "}
                            {item?.name}
                          </Button>
                        </Link>

                        {item?.children?.length !== 0 &&
                          context.windowWidth < 992 && (
                            <span
                              className={`arrow ${
                                isOpenSubMenuIndex === index &&
                                isOpenSubMenu_ === true &&
                                "rotate"
                              }`}
                              onClick={() => IsOpenSubMenu(index)}
                            >
                              <FaAngleDown />
                            </span>
                          )}

                        {item?.children?.length !== 0 && (
                          <div
                            className={`submenu ${
                              isOpenSubMenuIndex === index &&
                              isOpenSubMenu_ === true &&
                              "open"
                            }`}
                          >
                            {item?.children?.map((subCat, key) => {
                              return (
                                <Link
                                  href={`/category/subCat/${subCat?._id}`}
                                  key={key}
                                  onClick={props.closeNav}
                                >
                                  <Button>{subCat?.name}</Button>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
              {context.windowWidth < 992 && (
                <>
                  {context?.isLogin === false ? (
                    <div className="pt-3 pl-3 pr-3">
                      <Link href="/signIn">
                        <Button className="btn-blue w-100 btn-big">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-3 pl-3 pr-3"  onClick={logout}>
                       <Button className="btn-blue w-100 btn-big">
                         <RiLogoutCircleRFill/> Logout
                        </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navigation;
