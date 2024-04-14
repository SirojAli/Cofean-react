import Cookies from "universal-cookie";
import { serverApi } from "../../lib/config";

const cookies = new Cookies();
let member_data: any = null;

if (cookies.get("access_token")) {
  const memberDataJson: any = localStorage.getItem("member_data");
  if (memberDataJson) {
    try {
      // Attempt to parse the JSON string
      member_data = JSON.parse(memberDataJson);

      // If parsing is successful, modify the member_data object
      if (member_data && member_data.mb_image) {
        member_data.mb_image = `${serverApi}/${member_data.mb_image}`;
      }
    } catch (error) {
      // Handle parsing error (invalid JSON)
      console.error("Error parsing member data:", error);
    }
  }
} else {
  // Clear the member_data if access_token cookie is not present
  localStorage.removeItem("member_data");
}

console.log("== verify ==");
console.log(member_data);

const verifiedMemberData = member_data ? member_data : null;
export default verifiedMemberData;
