import Video from "../models/Video";

// export const home = (req, res) => {
//   Video.find({}, (error, videos) => {
//     return res.render("home", { pageTitle: "Home", videos: [] });
//   });
// };

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", {
    pageTitle: `Watching`,
  });
};
//getEdit은 form을 화면에 보여주는 함수
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", {
    pageTitle: `Editing:}`,
  });
};
//postEdit은 변경사항을 저장해주는 함수
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UploadVideo" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title: title,
      description: description,
      createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "UploadVideo",
      errorMessage: error._message,
    });
  }

  return res.redirect("/");
};
