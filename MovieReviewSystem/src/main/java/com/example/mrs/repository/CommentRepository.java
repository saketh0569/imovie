package com.example.mrs.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.mrs.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
	List<Comment> findByMid(Integer mid);
	
//	@Query("from Comment where mid=?1 and uid=?2")
	List<Comment> findByMidAndUid(Integer mid, Integer uid);
}
