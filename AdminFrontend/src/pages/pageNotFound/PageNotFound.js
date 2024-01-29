import "./PageNotFound.css";
import PAGE_NOT_FOUND from "../../assests/PAGE-NOT-FOUND.png";

const PageNotFound = () => {
  return (
    <div className="pnf-main-div">
      <img className="pnf-img" src={PAGE_NOT_FOUND} alt="" />
    </div>
  );
};

export default PageNotFound;
