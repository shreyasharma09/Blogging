import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminBlogDetailComp = (props) => {
    const navigate= useNavigate()
    const GetDate = (date) => {
        if (!date) return "---"
        const d = new Date(date)
        return (`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`)
    }
    const openblog = (key) => {
        localStorage.setItem("CurrentBlog", JSON.stringify(key))
        navigate("/AdminBlogDetail",{replace:true})
        props.fun(key)
      }
    return (
        <div className="news-details-wrap ptb-100">
            <div className="container">
                <div className="row gx-55 gx-5">
                    <div className="col-lg-8">
                        <article>
                            <div className="news-img">
                                <img loading="lazy" style={{ height: "400px", width: "900px", backgroundSize: 'cover' }} src={props?.data?.HeadingImage?.url} alt="Image" />
                                <a className="news-cat">{props?.data?.Category}</a>
                            </div>
                            <ul className="news-metainfo list-style">
                                <li><i className="fi fi-rr-calendar-minus" /><a>{GetDate(props?.data?.Date)}</a></li>
                                <li><i className="fi fi-rr-user" />By---{props?.data?.Author}</li>
                            </ul>
                            <div className="news-para">
                                <h1>{props?.data?.Heading}</h1>
                                <p>{props?.data?.Description}</p>
                            </div>
                            <div className="row">
                                {
                                    props?.data?.Images?.map(function (obj, index) {
                                        return (
                                            <div key={index} className="col-md-6">
                                                <div className="news-img">
                                                    <img loading='lazy' style={{ height: "250px", width: "420px" }} src={obj?.urls ? obj.urls : "assets/img/news/single-news-5.webp"} alt="image"></img>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                props?.data?.SubHeadingsData?.map(function (obj, index) {
                                    return (
                                        <div key={index} className='news-para'>
                                            <h5>{obj?.Sub_Heading}</h5>
                                            <p>{obj?.Sub_Heading_Description}</p>
                                        </div>
                                    )
                                })
                            }
                        </article>
                        <div className="post-pagination">
                                {props?.previous? <a onClick={()=>openblog(props.previous)} className='prev-post'> 
                                <span>PREVIOUS</span>
                                <h6>{props.alldata[props.previous].Title}</h6>
                           </a>:<a></a> }
                           {props?.next && <a onClick={()=>openblog(props.next)} className='next-post'> 
                           <span>NEXT</span>
                                <h6>{props.alldata[props.next].Title}</h6>
                           </a>}
                            </div>
                        <h3 className="comment-box-title">3 Comments</h3>
                        <div className="comment-item-wrap">
                            <div className="comment-item">
                                <div className="comment-author-img">
                                    <img src="assets/img/author/author-thumb-1.webp" alt="Image" />
                                </div>
                                <div className="comment-author-wrap">
                                    <div className="comment-author-info">
                                        <div className="row align-items-start">
                                            <div className="col-md-9 col-sm-12 col-12 order-md-1 order-sm-1 order-1">
                                                <div className="comment-author-name">
                                                    <h5>Killian Mider</h5>
                                                    <span className="comment-date">Jul 22, 2024 | 7:10 PM</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-md-end order-md-2 order-sm-3 order-3">
                                                <a href="#cmt-form" className="reply-btn">Reply</a>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12 order-md-3 order-sm-2 order-2">
                                                <div className="comment-text">
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                                        magna aliquyam.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-item reply">
                                <div className="comment-author-img">
                                    <img src="assets/img/author/author-thumb-2.webp" alt="Image" />
                                </div>
                                <div className="comment-author-wrap">
                                    <div className="comment-author-info">
                                        <div className="row align-items-start">
                                            <div className="col-md-9 col-sm-12 col-12 order-md-1 order-sm-1 order-1">
                                                <div className="comment-author-name">
                                                    <h5>Everly Leah </h5>
                                                    <span className="comment-date">Jul 23, 2024 | 7:10 PM</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-md-end order-md-2 order-sm-3 order-3">
                                                <a href="#cmt-form" className="reply-btn">Reply</a>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12 order-md-3 order-sm-2 order-2">
                                                <div className="comment-text">
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                                        magna aliquyam erat.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-item">
                                <div className="comment-author-img">
                                    <img src="assets/img/author/author-thumb-3.webp" alt="Image" />
                                </div>
                                <div className="comment-author-wrap">
                                    <div className="comment-author-info">
                                        <div className="row align-items-start">
                                            <div className="col-md-9 col-sm-12 col-12 order-md-1 order-sm-1 order-1">
                                                <div className="comment-author-name">
                                                    <h5>Michel Ohio</h5>
                                                    <span className="comment-date">Jun 14, 2024 | 7:10 PM</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-md-end order-md-2 order-sm-3 order-3">
                                                <a href="#cmt-form" className="reply-btn">Reply</a>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12 order-md-3 order-sm-2 order-2">
                                                <div className="comment-text">
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                                        sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                                        magna aliquyam.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div id="cmt-form">
                            <div className="mb-30">
                                <h3 className="comment-box-title">Leave A Comment</h3>
                                <p>Your email address will not be published. Required fields are marked.</p>
                            </div>
                            <form action="#" className="comment-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" name="name" id="name" required placeholder="Name*" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" required placeholder="Email Address*" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea name="messages" id="messages" cols={30} rows={10} placeholder="Please Enter Your Comment Here" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-check checkbox">
                                            <input className="form-check-input" type="checkbox" id="test_2" />
                                            <label className="form-check-label" htmlFor="test_2">
                                                Save my info for the next time I commnet.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <button className="btn-two">Post A Comment<i className="flaticon-right-arrow" /></button>
                                    </div>
                                </div>
                            </form>
                        </div> */}
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar">
                            <div className="sidebar-widget">
                                <h3 className="sidebar-widget-title">Recent Posts</h3>
                                <div className="pp-post-wrap">
                                    {
                                        (props?.alldata && props?.current) ? Object.keys(props.alldata).reverse().map((key, index) => {
                                            if (key !== props.current && index<10) {
                                                const date = new Date(props?.alldata[key]?.Date)
                                                return (
                                                    <div key={index} className="news-card-one">
                                                        <div className="news-card-img">
                                                            <img loading='lazy' style={{borderRadius:"50%",height:"100%",width:"100%",cursor:"pointer"}} src={props?.alldata[key]?.HeadingImage?.url} alt="Image" />
                                                        </div>
                                                        <div className="news-card-info">
                                                            <h3><a >{props?.alldata[key]?.Title}</a></h3>
                                                            <ul className="news-metainfo list-style">
                                                            <li><i className="fi fi-rr-calendar-minus" /><a href='#'>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }):""
                                        }          
                                        </div>
                                    </div>
                            <div className="sidebar-widget">
                                <h3 className="sidebar-widget-title">Popular Tags</h3>
                                <ul className="tag-list list-style">
                                    {
                                        props?.data && props.data.Tags.split(",").map((tag,index)=>{
                                            return(
                                                <li key={index}><a href="#">{tag}</a></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminBlogDetailComp
