import React from 'react';
import { notFound } from 'next/navigation';
import projectsData from '@/app/data/projects.json';
import ProjectDetailClient from './ProjectDetailClient';


interface Project {
  id: number;
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  likes: number;
  imageSrc: string;
  category: string;
  province: string;
  status: string;
  keywords: string;
}

async function getProject(id: string): Promise<Project | undefined> {
  const project = projectsData.find(p => p.id.toString() === id);
  return project;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// Treat params as a promise, which seems to be required by this Next.js/Turbopack version
export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const actualParams = await params;
  const project = await getProject(actualParams.id);
  const allProjects = projectsData; // Get all projects

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} allProjects={allProjects} />;
}