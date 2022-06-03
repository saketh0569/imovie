package com.example.mrs.service;
import java.util.List;
import com.example.mrs.model.Comment;

public interface CommentService {
	public Comment saveComment(Comment comment);
	public List<Comment> getAllCommentsByMid(Integer mid);
	public Comment getComment(Integer cid);
	public void updateComment(Comment comment, Integer cid);
	public List<Comment> getCommentsByMidUid(Integer mid, Integer uid);
}
