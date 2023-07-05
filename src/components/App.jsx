import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import { fetchImages } from 'services/api';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    totalHits: null,
    page: 1,
    selectedImage: null,
    isLoading: false,
    error: null,
    modal: { isOpen: false, visibleData: null },
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.setState(state => ({ page: 1 }));
    const inputValue = e.target.elements[1].value;

    if (inputValue === '') {
      this.setState(state => ({ images: [], searchQuery: "" }));
      return alert('Please enter what images do you want to find?');
    }

    this.setState(state => ({ searchQuery: inputValue }));
    e.target.elements[1].value = '';
  };

  onLoadMoreBtnClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  onSelectImage = imageId => {
    this.setState(state => ({ selectedImage: imageId }));
  };

  onOpenModal = data => {
    this.setState(state => ({
      modal: { isOpen: true, visibleData: data },
    }));
  };

  onCloseModal = () => {
    this.setState(state => ({ modal: { isOpen: false, visibleData: null }, selectedImage: null }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      if (this.state.searchQuery === "") { 
        return;
      }
      try {
        this.setState(state => ({ isLoading: true }));
        const { hits, totalHits } = await fetchImages(
          this.state.searchQuery,
          this.state.page
        );

        if (this.state.page === 1) {
          this.setState(state => ({ images: [...hits], totalHits }));
        } else {
          this.setState(state => ({
            images: [...state.images, ...hits],
            totalHits,
          }));
        }

        if (hits.length === 0) {
          alert(
            "Oops! We didn't find any image on this query. Please try another one..."
            );
            this.setState(state => ({ searchQuery: "" }));
        }
      } catch (error) {
        this.setState(state => ({ error: error.message }));
      } finally {
        this.setState(state => ({ isLoading: false }));
      }
    }

    if (prevState.selectedImage !== this.state.selectedImage) {
      if (this.state.selectedImage === null) { 
        return;
      }
      const largeImage = this.state.images.find(
        el => el.id === this.state.selectedImage
      );
      this.onOpenModal(largeImage);
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmitForm={this.onSubmitForm} />
        {this.state.isLoading && this.state.images.length <= 0 && <Loader />}
        {this.state.error !== null && (
          <p>
            Something wrong. The error is: {this.state.error}. Please try again
            later.
          </p>
        )}
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            selectImg={this.onSelectImage}
          />
        )}
        {this.state.isLoading && this.state.images.length > 0 && <Loader />}
        {this.state.images.length > 0 && this.state.page < Math.ceil(this.state.totalHits / 12) && (
          <Button onBtnClick={this.onLoadMoreBtnClick} />
        )}
        {this.state.modal.isOpen && (
          <Modal
            modalData={this.state.modal.visibleData}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}
