const fakeUser = {
  username: "Marco",
  loggedIn: false,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "Fist video",
      rating: 5,
      comments: 2,
      created: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Second video",
      rating: 5,
      comments: 2,
      created: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Third video",
      rating: 5,
      comments: 2,
      created: "2 minutes ago",
      views: 59,
      id: 1,
    },
  ];
  return res.render("home", { pageTitle: "Home", fakeUser: fakeUser, videos });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });

export const search = (req, res) => res.send("Search", { pageTitle: "Search" });
export const upload = (req, res) => res.send("Upload", { pageTitle: "Upload" });
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video", { pageTitle: "DeleteVideo" });
};
