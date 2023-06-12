import { Component } from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

import * as Request from './service/request';
import Button from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isShowButton: false,
    isEmpty: false,
    isLoading: false,
    error: null,
    selectedImage: null,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  getImages = async (query, currentPage) => {
    this.setState({ isLoading: true });
    try {
      const { data } = await Request.getImages(query, currentPage);

      const { hits, totalHits } = data;

      if (!hits.length) {
        this.setState({ isEmpty: true });
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isShowButton: currentPage < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = search => {
    this.setState({
      query: search,
      images: [],
      page: 1,
      isShowButton: false,
      isEmpty: false,
      isLoading: false,
      error: null,
    });
  };
  handleOnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={this.state.images}
          onItemClick={this.handleImageClick}
        />
        <Button onClick={this.handleOnClick} />

        {this.state.showModal && (
          <Modal
            image={this.state.selectedImage}
            onClose={this.handleModalClose}
          />
        )}
      </>
    );
  }
}
