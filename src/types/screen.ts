import { Blog } from "./blog";
import { Product } from "./product";
import { Member, Cafe } from "./user";
import { Order } from "./order";
import { Follower, Following } from "./follow";
import { Review } from "./review";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  cafePage: CafePageState;
  productPage: ProductPageState;

  // ordersPage: OrdersPageState;
  // communityPage: CommunityPageState;
  // memberPage: MemberPageState;
}

/** HOME PAGE */
export interface HomePageState {
  topCafes: Cafe[];
  trendProducts: Product[];
  saleProducts: Product[];
  topPosts: Blog[];
}

/** Cafe PAGE */
export interface CafePageState {
  allCafes: Cafe[];
  chosenCafe: Cafe | null;
  randomCafes: Cafe[];
  cafeProducts: Product[];
}

/** Product PAGE */
export interface ProductPageState {
  allProducts: Product[];
  randomProducts: Product[];
  chosenProduct: Product | null;
  bestSellerProducts: Product[];
  productReviews: Review[];
}

// /** ORDERS PAGE */
// export interface OrdersPageState {
//   pausedOrders: Order[];
//   processOrders: Order[];
//   finishedOrders: Order[];
// }

// /** ORDERS PAGE */
// export interface CommunityPageState {
//   targetBoArticles: BoArticle[];
// }

// /** MEMBER PAGE */
// export interface MemberPageState {
//   chosenMember: Member | null;
//   chosenMemberBoArticles: BoArticle[];
//   chosenSingleBoArticle: BoArticle | null;
//   memberFollowers: Follower[];
//   memberFollowings: Following[];
// }
