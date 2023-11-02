import React, { useState, useEffect } from 'react';

interface Comment{
    _id: string;
    comment: String;
    replies: [String];
   
}
function Thread() {
    const [post, setPost] = useState('');
    const [replyPost,setReplyPost] = useState('');
    const [commentId,setCommentId] = useState('');
    const [comments,setComments] = useState<Comment[]>([]);
    const [switchOn,setSwitchOn] = useState(false);
    const [subSwitchOn,setSubSwitchOn] = useState(false);
    async function fetchComments(){
        try{
            const response = await fetch('http://localhost:3001/posts/api');
            if (response.ok){
                const commentsData = await response.json();
                setComments(commentsData);
            }
        } catch(err){
            console.error("Not able to fetch");
        }

    }

    useEffect(()=>{
        fetchComments();
    },[]);

    async function AddPost() {
        try {
            const response = await fetch('http://localhost:3001/posts/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post,commentId,replyPost
                })
            });

            if (response.ok) {
                console.log("Post added to Mongo");
            } else {
                console.log("Failed to add Post");
            }
        } catch (err) {
            console.error(err);
        }
        await fetchComments();
    }

    async function AddReply(commentId: string) {
        try {
            const response = await fetch('http://localhost:3001/posts/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentId,
                    replyPost
                })
            });

            if (response.ok) {
                console.log("Response given");
            } else {
                console.log("Failed to add Post");
            }
        } catch (err) {
            console.error(err);
        }
        await fetchComments();
    }
    

    const replyBox = () => {
        return(
            <div>
                <input id='reply-input' placeholder='Write your reply here...' value={replyPost} onChange={(e) => setReplyPost(e.target.value)}/>
                <button onClick={()=>{
                    setSwitchOn(false);
                    AddReply(commentId);
                    setCommentId('');
                    setReplyPost('');
                    }
                }>Submit Reply</button> 

            </div>
        )
    }


    return (
        <>
        
            <section className="bodycontainer">
                <div className="comments-container">
                    <input
                        id="comment-input"
                        placeholder="Write your comment here..."
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    ></input>
                    <button id="submit-btn" onClick={AddPost}>Submit Comment</button>
                </div>
                <div className="comments-list">
                    
                    {comments.slice().reverse().map((comment, index) => (
                        // <div key={index} className="comment">
                        //     <div className="user">Username</div>
                        //     <div className="likes">
                        //         <button type="button">Like</button>
                        //         <button type="button">Dislike</button>
                        //     </div>
                        //     <div className="post-comment">
                        //     {comment.comment}
                        //     </div>
                        //     <div className="reply-comment">
                        //         <button 
                        //             type="button"
                        //             className='reply-btn'
                        //             onClick={()=>{
                        //                 setSwitchOn(!switchOn); 
                        //                 setCommentId(comment._id);
                        //             }
                        //         }
                        //             >Reply</button>
                        //         {switchOn && commentId===comment._id && replyBox()}
                        //     </div>
                        //     <div className="reply">
                        //         {comment.replies && comment.replies.slice().reverse().map((reply, replyIndex) => (
                                    
                        //             <div key={replyIndex} className="reply-box">
                        //                 <div className="likes">
                        //                     <button type="button">Like</button>
                        //                     <button type="button">Dislike</button>
                        //                 </div>
                        //                 <div className="post-reply">
                        //                     {reply}
                        //                 </div>
                        //                 {/* <div className="reply-comment">
                        //                     <button 
                        //                         type="button"
                        //                         className='reply-btn'
                        //                         onClick={()=>{
                        //                             setSwitchOn(true); 
                        //                             setCommentId(comment._id);
                        //                         }
                        //                     }
                        //                     >Reply</button>
                        //                     {switchOn && commentId===comment._id && replyBox()}
                        //                 </div> */}
                                        
                        //             </div>
                        //         ))}
                        //     </div>
                        // </div>

                        <div key={index} className="comment-thread">

                            <details open className="comment" >
                                <a href="#" className="comment-border-link">
                                    <span className="sr-only">Jump to comment-1</span>
                                </a>
                                <summary>
                                    <div className="comment-heading">
                                        <div className="comment-voting">
                                            <button type="button">
                                                <span aria-hidden="true">&#9650;</span>
                                                <span className="sr-only">Vote up</span>
                                            </button>
                                            <button type="button">
                                                <span aria-hidden="true">&#9660;</span>
                                                <span className="sr-only">Vote down</span>
                                            </button>
                                        </div>
                                        <div className="comment-info">
                                            <a href="#" className="comment-author">someguy14</a>
                                            <p className="m-0">
                                                22 points &bull; 4 days ago
                                            </p>
                                        </div>
                                    </div>
                                </summary>

                                <div className="comment-body">
                                    <p>
                                        {comment.comment}
                                    </p>
                                    <button type="button" className="reply-btn" onClick={()=>{
                                        setSwitchOn(!switchOn);
                                        setCommentId(comment._id);
                                    }}>Reply</button>
                                    <button type="button">Flag</button>
                                </div>
                                {switchOn && commentId===comment._id && replyBox()}

                                {comment.replies && comment.replies.slice().reverse().map((reply, replyIndex) => (
                                                            
                                
                                    <div key={replyIndex} className="replies">
                                        
                                    
                                        <details open className="comment" >
                                            <a href="#" className="comment-border-link">
                                                <span className="sr-only">Jump to comment-2</span>
                                            </a>
                                            <summary>
                                                <div className="comment-heading">
                                                    <div className="comment-voting">
                                                        <button type="button">
                                                            <span aria-hidden="true">&#9650;</span>
                                                            <span className="sr-only">Vote up</span>
                                                        </button>
                                                        <button type="button">
                                                            <span aria-hidden="true">&#9660;</span>
                                                            <span className="sr-only">Vote down</span>
                                                        </button>
                                                    </div>
                                                    <div className="comment-info">
                                                        <a href="#" className="comment-author">randomperson81</a>
                                                        <p className="m-0">
                                                            4 points &bull; 3 days ago
                                                        </p>
                                                    </div>
                                                </div>
                                            </summary>

                                            <div className="comment-body">
                                                <p>
                                                    {reply}
                                                </p>
                                                <button type="button">Reply</button>
                                                <button type="button">Flag</button>
                                            </div>
                                        </details>
                                    
                                    </div>
                                ))}
                            </details>
                        
                    
                        </div>
                    ))}
                </div>
            </section>
            
        
        </>
    );
}

export default Thread;