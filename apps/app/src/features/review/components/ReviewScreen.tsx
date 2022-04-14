import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../navigation/navigation_constants";

export const ReviewScreen = (): React.ReactElement => {
  return (
    <div>
      <div>Review</div>
      <p>
        <Link to={APP_ROUTES.HOME}>Back</Link>
      </p>
    </div>
  );
};
