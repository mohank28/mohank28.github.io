import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.showCreateModal = this.showCreateModal.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.showDelModal = this.showDelModal.bind(this);
    this.hideDelModal = this.hideDelModal.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitEditForm = this.submitEditForm.bind(this);
    this.submitCreateForm = this.submitEditForm.bind(this);
    this.titleCase = this.titleCase.bind(this);

    this.state = {
      books: [],
      book:{},
      showAlert: false,
      bookId:"",
      bookTitle:"",
      bookAuthor:"",
      bookPubDate:"",
      
      bookTitleErr:"",
      bookAuthErr:"",
      bookPubDateErr:"",

    };
  }  

  hideEditModal() {
    this.setState({ showEditForm: false });
    this.setState({ bookTitleErr:"",
      bookAuthErr:"",
      bookPubDateErr:"" 
    });
  }

  showEditModal(e,book_id) {
    //console.log(book_id);
    var this_book_arr = this.state.books.filter(obj => (obj.id == book_id));
    var this_book_obj = {};
    this_book_obj['id'] = this_book_arr[0].id;
    this_book_obj['title'] = this.titleCase(this_book_arr[0].volumeInfo.title);
    this_book_obj['author'] = this_book_arr[0].volumeInfo.publisher;
    var final_date = this_book_arr[0].volumeInfo.publishedDate.length > 4 ? this_book_arr[0].volumeInfo.publishedDate: "";
    this_book_obj['publish_date'] = final_date;
    this.setState({ showEditForm: true,book:this_book_obj,bookId:this_book_arr[0].id,bookTitle:this_book_arr[0].volumeInfo.title,bookAuthor:this_book_arr[0].volumeInfo.publisher,bookPubDate:final_date});
  }

  hideCreateModal() {
    this.setState({ showCreateForm: false });
    this.setState({ bookTitleErr:"",
      bookAuthErr:"",
      bookPubDateErr:"" 
    });
  }

  showCreateModal(e) {
    this.setState({ showCreateForm: true,bookTitle:"",
      bookAuthor:"",
      bookPubDate:"",});
  }

  showDelModal(e,book_id) {
    //console.log(book_id);
    var this_book_arr = this.state.books.filter(obj => (obj.id == book_id));
    var this_book_obj = {};
    this_book_obj['id'] = this_book_arr[0].id;
    this_book_obj['title'] = this.titleCase(this_book_arr[0].volumeInfo.title);
    this_book_obj['author'] = this_book_arr[0].volumeInfo.publisher;
    var final_date = this_book_arr[0].volumeInfo.publishedDate.length > 4 ? this_book_arr[0].volumeInfo.publishedDate: "";
    this_book_obj['publish_date'] = final_date;
    this.setState({ showDelForm: true,book:this_book_obj,bookId:this_book_arr[0].id,bookTitle:this_book_arr[0].volumeInfo.title,bookAuthor:this_book_arr[0].volumeInfo.publisher,bookPubDate:final_date});
  }

  hideDelModal() {
    this.setState({ showDelForm: false});
  }

  deleteBook(){
     var this_new_books = this.state.books.filter(obj => (obj.id != this.state.bookId));
     this.setState({ showDelForm: false,books:this_new_books});
  }

  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  titleCase(str) 
  {
      //console.log(str);
      str = str.split(" ");
      for (var i = 0, x = str.length; i < x; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
      return str.join(" ");
  }

  submitEditForm(){
      const bookTitle = this.state.bookTitle;
      const bookAuthor = this.state.bookAuthor;
      const bookPubDate = this.state.bookPubDate;
      let isValidTitle = true;
      let isValidAuthor = true;
      let isValidDate = true;
      //console.log(bookTitle);
      if (bookTitle.length == 0) {
       var bookTitleErr  = 'Title is required.';
       isValidTitle = false;
      }
      else
      {
        var this_book_arr = this.state.books.filter(obj => (obj.id != this.state.bookId && obj.volumeInfo.title == bookTitle));
        //console.log(this_book_arr);
        if(this_book_arr.length > 0)
        {
          var bookTitleErr  = 'Title already exists.';
          isValidTitle = false;
        }
        else
        {
           var bookTitleErr  = "";
           isValidTitle = true;
        }
      }
      if(bookAuthor.length == 0) {
       var bookAuthErr  = 'Author is required.';
       isValidAuthor = false;
      }
      else
      {
        var bookAuthErr  = "";
        isValidAuthor = true;
      }
      if (bookPubDate.length == 0) {
       var bookPubDateErr  = 'Date is required.';
       isValidDate = false;
      }
      else
      {
        var bookPubDateErr  = "";
        isValidDate = true;
      }

      if (!isValidTitle || !isValidAuthor || !isValidDate) {
        this.setState({
          bookTitleErr:bookTitleErr,
          bookAuthErr:bookAuthErr,
          bookPubDateErr:bookPubDateErr
        });
        return false;
      }
      
      this.hideEditModal();
      this.hideCreateModal();
  }
  
  fetchFirst(url) {
    var that = this;
    if (url) {
      fetch('https://www.googleapis.com/books/v1/volumes?q='+url).then(function (response) {
        return response.json();
      }).then(function (result) {

        //console.log(result);
        
        that.setState({ books: result.items});

        //console.log(that.state.books);
      });
    }
  }  
  componentWillMount() {

      this.fetchFirst("Health");

  }    
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title text-center">React AJAX Example</h1>
        </header>
          <div className="text-center">
            <a className="btn btn-primary btn-large" onClick={(e) => this.showCreateModal(e)}>Add book</a>
          </div>
          <br/>
          <div className="container">
            {this.state.books.map(book =>
              <div key={book.etag} id={book.id} className="row book">
                <div className="col-md-3">
                <img src={book.volumeInfo.imageLinks.smallThumbnail} className="img-thumbnail" width="80px;" />
                </div>
                <div className="col-md-6">
                <p><b>ID:</b>{book.id}</p>
                <p><b>Title:</b>{this.titleCase(book.volumeInfo.title)}</p>
                <p><b>Author:</b>{book.volumeInfo.publisher}</p>
                <p><b>Published Date:</b>{book.volumeInfo.publishedDate}</p>
                </div>
                <div className="col-md-3">
                  <a className="editBook btn btn-primary" onClick={(e) => this.showEditModal(e, book.id)} data-book-id={book.id}>Edit book</a>
                  <a className="deleteBook btn btn-danger" onClick={(e) => this.showDelModal(e, book.id)} data-book-id={book.id}>Delete book</a>
                </div>
              </div>
            )}
          </div>     

          <Modal show={this.state.showCreateForm} onHide={this.hideCreateModal}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Add Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId="bookTitle">
                  <Col componentClass={ControlLabel} sm={3}>
                    Title
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookTitle" type="text" defaultValue={this.state.bookTitle} onChange={this.handleInputChange}/>
                    <span className="help-block">{this.state.bookTitleErr}</span>
                  </Col>
                  
                </FormGroup>
                <FormGroup controlId="bookAuthor">
                  <Col componentClass={ControlLabel} sm={3}>
                    Author
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookAuthor" type="text" defaultValue={this.state.bookAuthor} onChange={this.handleInputChange}/>
                    <span className="help-block">{this.state.bookAuthErr}</span>
                  </Col>
                </FormGroup>
                <FormGroup controlId="bookPubDate">
                  <Col componentClass={ControlLabel} sm={3}>
                    Publish date
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookPubDate" type="date" defaultValue={this.state.bookPubDate} onChange={this.handleInputChange} placeholder="Accepted formats yyyy-mm-dd or yyyy"/>
                    <span className="help-block">{this.state.bookPubDateErr}</span>
                  </Col>
                </FormGroup>
              </Form>;
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" onClick={this.submitCreateForm}>Create</Button>
              <Button className="btn btn-info" onClick={this.hideCreateModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showEditForm} onHide={this.hideEditModal}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Edit Book - {this.state.book.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId="bookId">
                  <Col componentClass={ControlLabel} sm={3}>
                    Id
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookId" type="text" defaultValue={this.state.bookId} disabled/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="bookTitle">
                  <Col componentClass={ControlLabel} sm={3}>
                    Title
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookTitle" type="text" defaultValue={this.state.bookTitle} onChange={this.handleInputChange}/>
                    <span className="help-block">{this.state.bookTitleErr}</span>
                  </Col>
                  
                </FormGroup>
                <FormGroup controlId="bookAuthor">
                  <Col componentClass={ControlLabel} sm={3}>
                    Author
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookAuthor" type="text" defaultValue={this.state.bookAuthor} onChange={this.handleInputChange}/>
                    <span className="help-block">{this.state.bookAuthErr}</span>
                  </Col>
                </FormGroup>
                <FormGroup controlId="bookPubDate">
                  <Col componentClass={ControlLabel} sm={3}>
                    Publish date
                  </Col>
                  <Col sm={9}>
                    <FormControl name="bookPubDate" type="date" defaultValue={this.state.bookPubDate} onChange={this.handleInputChange} placeholder="Accepted formats yyyy-mm-dd or yyyy"/>
                    <span className="help-block">{this.state.bookPubDateErr}</span>
                  </Col>
                </FormGroup>
              </Form>;
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" onClick={this.submitEditForm}>Save</Button>
              <Button className="btn btn-info" onClick={this.hideEditModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showDelForm} onHide={this.hideDelModal}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Delete Book - {this.state.book.title} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-danger" onClick={this.deleteBook}>Delete book</Button>
              <Button className="btn btn-info" onClick={this.hideDelModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        
      </div>
    );
  }
}

export default App;
