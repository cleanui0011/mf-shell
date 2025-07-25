import React from "react";

export const RemoteSearchBar = React.lazy(() => import("SharedModules/SearchBar"));
export const RemoteSearchButton = React.lazy(() =>
  import("SharedModules/SearchButton")
);
export const LeftNavComponent = React.lazy(() => import("SharedModules/LeftNav"));
export const TopNavComponent = React.lazy(() => import("TopNav/TopNav"));
export const ItemDetailsComponent = React.lazy(() =>
  import("ItemDetails/ItemDetails")
);
export const LoginComponent = React.lazy(() => import("LoginPage/LoginPage"));
