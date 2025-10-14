// import { useState, useEffect } from 'react'
import "@radix-ui/themes/styles.css"
import './App.css'
// import {useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CourseDetailPage from './pages/CourseDetailPage'

function App () {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cours/:courseId" element={<CourseDetailPage />} />
    </Routes>
  )
}

export default App;