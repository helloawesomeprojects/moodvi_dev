export type DateTimeString = string;

interface BaseEntity {
  id: number;
  createdAt: DateTimeString;
  updatedAt: DateTimeString;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  emailVerifiedAt?: DateTimeString;
  username: string;
}

export class Video {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public distance: number,
    public isLiked: boolean,
    public isSaved: boolean,
    public commentsCount: number,
    public likesCount: number,
    public savesCount: number,
    public sharesCount: number,
    public lat: string,
    public lon: string,
    public userDetail: User,
    public file: string,
    public createdAt: DateTimeString,
    public updatedAt: DateTimeString
  ) {}

  public static fromApi(data: any) {
    return new Video(
      data.id,
      data.title,
      data.description,
      data.distance,
      data.isLiked === "1",
      data.isSaved === "1",
      data.commentsAmount,
      data.likesAmount,
      data.savesAmount,
      data.sharesCount,
      data.latitude,
      data.longitude,
      data.userDetail,
      data.file,
      data.createdAt,
      data.updatedAt
    );
  }
}

export interface Comment extends BaseEntity {
  userId: number;
  userDetail: User;
  videoId: number;
  video?: Video;
  comment: string;
  replies?: CommentReply[];
}

export interface CommentReply extends BaseEntity {
  commentId: number;
  userId: number;
  reply: string;
}
