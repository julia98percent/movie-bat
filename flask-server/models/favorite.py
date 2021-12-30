from db_connect import db
from datetime import datetime
from datetime import timedelta

# 사용자가 찜한 영화 목록
class Favorite(db.Model):

    __tablename__ = 'favorite_tb'

    favorite_idx = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    movie_idx = db.Column(db.Integer, db.ForeignKey("movie_tb.movie_idx"), nullable=False)
    user_idx = db.Column(db.Integer, db.ForeignKey("user_info_tb.user_id"), nullable=False)
    favorite_date = db.Column(db.Datetime, nullable=False, default=datetime.utcnow() + timedelta(hours=9))

    def __init__(self, movie_idx, user_idx, date):
        self.movie_idx = movie_idx
        self.user_idx = user_idx
        self.favorite_date = date