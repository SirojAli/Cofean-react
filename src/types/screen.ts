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
  memberPage: MemberPageState;
  blogPage: BlogPageState;
  // ordersPage: OrdersPageState;
}

/** HOME PAGE */
export interface HomePageState {
  topCafes: Cafe[];
  trendProducts: Product[];
  saleProducts: Product[];
  topBlogs: Blog[];
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

/** MEMBER PAGE */
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBlogs: Blog[];
  chosenBlog: Blog | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}

/** Product PAGE */
export interface BlogPageState {
  allBlogs: Blog[];
  topBlogs: Blog[];
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
