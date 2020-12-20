import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import { movieAPI as API } from "../../API";
import { useParams, useHistory, withRouter } from "react-router-dom";
import { db } from "../../firebase";
import { AuthContext } from "../../Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "../Main";
const Details = (props) => {
  const history = useHistory();
  const [mov, setMov] = useState([]);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    fetch(`${API.details}${id}?api_key=${API.key}&language=en-US`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMov(res);
      });
    if (currentUser !== null) {
      const collectionRef = db
        .collection("liked")
        .doc(currentUser)
        .collection("likes")
        .doc(id);
      collectionRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          setDisplayLike(false);
          console.log("exists");
          setUnLike(true);
        } else {
          setDisplayLike(true);
        }
      });
    } else {
      setShowFeature(true);
    }
  }, [id, currentUser]);

  const [displayLike, setDisplayLike] = useState(false);
  const [showFeature, setShowFeature] = useState(false);
  const back = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const addLike = (e) => {
    e.preventDefault();
    console.log("clicked like");
    try {
      const collectionRef = db
        .collection("liked")
        .doc(currentUser)
        .collection("likes")
        .doc(id);
      collectionRef.set({ title: mov.title, id });
      toast.success("Liked");
      setDisplayLike(false);
      setUnLike(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeLike = (e) => {
    const collectionRef = db
      .collection("liked")
      .doc(currentUser)
      .collection("likes")
      .doc(id);
    collectionRef.delete().then(() => {
      setUnLike(false);
      setDisplayLike(true);
      toast.info("Like Removed");
    });
  };
  const [unLike, setUnLike] = useState(false);
  return (
    <>
      <Main />
      <Container>
        <Card
          className="bg-dark m-5 text-info text-left mx-auto"
          style={{ maxWidth: "90vw" }}
        >
          <Card.Img
            src={`${API.image}${mov.poster_path}`}
            className="p-1 border border-white"
          />
          <Card.Body>
            <Card.Title className="text-center border-bottom border-secondary p-1">
              {mov.title}
            </Card.Title>
            <Card.Text className="border-bottom border-secondary p-1 m-1">
              {mov.overview}
            </Card.Text>

            <Card.Text>
              <Row>
                <Col className="border-secondary border-left p-1">
                  <p>Companies:</p>
                  <p>
                    {mov.production_companies?.map((item) => {
                      return <p>{item.name}</p>;
                    })}
                  </p>
                </Col>
                <Col className="border-secondary border-left p-1">
                  <p>Genres:</p>
                  <p>
                    {mov.genres?.map((item) => {
                      return <p>{item.name}</p>;
                    })}
                  </p>
                </Col>
                <Col className="border-secondary border-left border-right p-1">
                  <p>Languages:</p>
                  <p>
                    {mov.spoken_languages?.map((item) => {
                      return <p>{item.name}</p>;
                    })}
                  </p>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="outline-warning" className="m-3" onClick={back}>
              Back
            </Button>
            {!!displayLike ? (
              <Button
                variant="outline-success"
                name={id}
                onClick={addLike}
                className="m-3"
              >
                Like
              </Button>
            ) : (
              ""
            )}
            {!!unLike ? (
              <Button
                variant="outline-danger"
                name={id}
                onClick={removeLike}
                className="m-3"
              >
                Unlike
              </Button>
            ) : (
              ""
            )}
            {showFeature ? (
              <p className="text-info mx-auto m-1">
                Register To Add To Favourites
              </p>
            ) : (
              ""
            )}
          </Card.Footer>
        </Card>
        <ToastContainer />
      </Container>
    </>
  );
};

export default withRouter(Details);
