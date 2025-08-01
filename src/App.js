import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from "react-top-loading-bar";
import ErrorBoundary from './Components/ErrorBoundary';

export default class App extends Component {
  state = {
    progress: 0,
    error: null
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  // Error boundary for the entire app
  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
    this.setState({ error: error.message });
  }

  // Configuration for routes - easier to maintain
  newsRoutes = [
    { path: "/", category: "general", key: "general" },
    { path: "/business", category: "business", key: "business" },
    { path: "/entertainment", category: "entertainment", key: "entertainment" },
    { path: "/health", category: "health", key: "health" },
    { path: "/science", category: "science", key: "science" },
    { path: "/sports", category: "sports", key: "sports" },
    { path: "/technology", category: "technology", key: "technology" }
  ];

  // Common props for all News components
  commonNewsProps = {
    pageSize: 6,
    country: "us",
    apikey: process.env.REACT_APP_API_KEY
  };

  render() {
    const { progress, error } = this.state;

    // If there's a critical app error, show error page
    if (error) {
      return (
        <div className="error-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: '#ff8800ff',
          fontFamily: 'Times New Roman, serif'
        }}>
          <h1>Something went wrong</h1>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff8800ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <ErrorBoundary>
          <div className="App">
            <Navbar />
            
            <LoadingBar
              color='#ff8800ff'
              progress={progress}
              onLoaderFinished={() => this.setProgress(0)}
              height={3}
            />
            
            <Routes>
              {/* Generate routes dynamically */}
              {this.newsRoutes.map(route => (
                <Route 
                  key={route.key}
                  path={route.path} 
                  element={
                    <News 
                      setProgress={this.setProgress}
                      category={route.category}
                      {...this.commonNewsProps}
                      key={route.key}
                    />
                  } 
                />
              ))}
              
              {/* Redirect old routes if needed */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              
              {/* Professional 404 page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

// Separate 404 component for better maintainability
const NotFoundPage = () => (
  <div className="not-found-container" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: '#ca9204',
    fontFamily: 'Times New Roman, serif',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px' }}>
      The page you're looking for doesn't exist or has been moved.
    </p>
    <div>
      <a 
        href="/" 
        style={{
          padding: '12px 24px',
          backgroundColor: '#ca9204',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          marginRight: '1rem'
        }}
      >
        Go Home
      </a>
      <button 
        onClick={() => window.history.back()} 
        style={{
          padding: '12px 24px',
          backgroundColor: 'transparent',
          color: '#ca9204',
          border: '2px solid #ca9204',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Go Back
      </button>
    </div>
  </div>
);