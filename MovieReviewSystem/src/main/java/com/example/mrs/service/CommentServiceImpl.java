package com.example.mrs.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.mrs.model.Comment;
import com.example.mrs.repository.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public Comment saveComment(Comment comment) {
		return commentRepository.save(comment);
	}

	@Override
	public List<Comment> getAllCommentsByMid(Integer mid) {
		return commentRepository.findByMid(mid);
	}
	
	@Override
	public Comment getComment(Integer cid) {
		return commentRepository.findById(cid).get();
	}
	
	@Override
	public void updateComment(Comment comment, Integer cid) {
		Comment temp = commentRepository.findById(cid).get();
		temp.setRate(comment.getRate());
		temp.setReview(comment.getReview());
		
		commentRepository.save(temp);
	}
	
	@Override
	public List<Comment> getCommentsByMidUid(Integer mid, Integer cid) {
		return commentRepository.findByMidAndUid(mid, cid);
	}
}
