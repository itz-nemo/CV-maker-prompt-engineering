"use client"

import { useState } from "react"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CVData {
  fullName: string
  jobTitle: string
  cityCountry: string
  phoneNumber: string
  email: string
  portfolioUrl: string
  linkedinUrl: string
  githubUrl: string
  otherSocialUrls: string
  summaryText: string
  experience: any[]
  education: any[]
  skills: string[]
  projects: any[]
  certifications: any[]
  languages: any[]
  interests: string[]
}

export default function CVForm({ cvData, setCvData }: { cvData: CVData; setCvData: (data: CVData) => void }) {
  const [expandedSections, setExpandedSections] = useState({
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    certifications: false,
    languages: false,
    interests: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateField = (field: string, value: any) => {
    setCvData({ ...cvData, [field]: value })
  }

  const updateExperience = (id: number, field: string, value: any) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const updateEducation = (id: number, field: string, value: any) => {
    setCvData({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const updateProject = (id: number, field: string, value: any) => {
    setCvData({
      ...cvData,
      projects: cvData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const updateResponsibility = (expId: number, index: number, value: string) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: exp.responsibilities.map((r: string, i: number) => (i === index ? value : r)) }
          : exp,
      ),
    })
  }

  const addExperience = () => {
    const newId = Math.max(...cvData.experience.map((e) => e.id), 0) + 1
    setCvData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          id: newId,
          jobTitle: "",
          companyName: "",
          employmentType: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: ["", "", ""],
        },
      ],
    })
  }

  const deleteExperience = (id: number) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newId = Math.max(...cvData.education.map((e) => e.id), 0) + 1
    setCvData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: newId,
          degree: "",
          institutionName: "",
          startYear: "",
          endYear: "",
          grade: "",
        },
      ],
    })
  }

  const deleteEducation = (id: number) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const addProject = () => {
    const newId = Math.max(...cvData.projects.map((p) => p.id), 0) + 1
    setCvData({
      ...cvData,
      projects: [
        ...cvData.projects,
        {
          id: newId,
          projectName: "",
          projectTags: "",
          projectDescription: "",
          projectLink: "",
        },
      ],
    })
  }

  const deleteProject = (id: number) => {
    setCvData({
      ...cvData,
      projects: cvData.projects.filter((proj) => proj.id !== id),
    })
  }

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...cvData.skills]
    newSkills[index] = value
    setCvData({ ...cvData, skills: newSkills })
  }

  const addSkill = () => {
    setCvData({ ...cvData, skills: [...cvData.skills, ""] })
  }

  const deleteSkill = (index: number) => {
    setCvData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== index) })
  }

  const updateInterest = (index: number, value: string) => {
    const newInterests = [...cvData.interests]
    newInterests[index] = value
    setCvData({ ...cvData, interests: newInterests })
  }

  const addInterest = () => {
    setCvData({ ...cvData, interests: [...cvData.interests, ""] })
  }

  const deleteInterest = (index: number) => {
    setCvData({ ...cvData, interests: cvData.interests.filter((_, i) => i !== index) })
  }

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-2rem)]">
      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleSection("contact")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Contact Information *</span>
            <ChevronDown size={20} className={`transition ${expandedSections.contact ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.contact && (
            <div className="space-y-3 pb-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name *</label>
                <Input
                  value={cvData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Job Title *</label>
                <Input
                  value={cvData.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="Your job title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">City, Country *</label>
                <Input
                  value={cvData.cityCountry}
                  onChange={(e) => updateField("cityCountry", e.target.value)}
                  placeholder="City, Country"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <Input
                  value={cvData.phoneNumber}
                  onChange={(e) => updateField("phoneNumber", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email *</label>
                <Input
                  value={cvData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Portfolio URL *</label>
                <Input
                  value={cvData.portfolioUrl}
                  onChange={(e) => updateField("portfolioUrl", e.target.value)}
                  placeholder="portfolio.com"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">LinkedIn URL *</label>
                <Input
                  value={cvData.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  placeholder="linkedin.com/in/yourprofile"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">GitHub URL *</label>
                <Input
                  value={cvData.githubUrl}
                  onChange={(e) => updateField("githubUrl", e.target.value)}
                  placeholder="github.com/yourprofile"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Other Social URLs</label>
                <Input
                  value={cvData.otherSocialUrls}
                  onChange={(e) => updateField("otherSocialUrls", e.target.value)}
                  placeholder="twitter.com/yourprofile"
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleSection("summary")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Professional Summary *</span>
            <ChevronDown size={20} className={`transition ${expandedSections.summary ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.summary && (
            <div className="pb-4">
              <Textarea
                value={cvData.summaryText}
                onChange={(e) => updateField("summaryText", e.target.value)}
                placeholder="Write a brief summary about yourself..."
                className="mt-2 min-h-24"
              />
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleSection("experience")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Work Experience *</span>
            <ChevronDown size={20} className={`transition ${expandedSections.experience ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.experience && (
            <div className="space-y-4 pb-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-900">{exp.jobTitle || "New Experience"}</h4>
                    <button onClick={() => deleteExperience(exp.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <Input
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                    placeholder="Job Title *"
                  />
                  <Input
                    value={exp.companyName}
                    onChange={(e) => updateExperience(exp.id, "companyName", e.target.value)}
                    placeholder="Company Name *"
                  />
                  <Input
                    value={exp.employmentType}
                    onChange={(e) => updateExperience(exp.id, "employmentType", e.target.value)}
                    placeholder="Employment Type (Full-time, Part-time, etc.)"
                  />
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    placeholder="Location"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      placeholder="Start Date"
                    />
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      placeholder="End Date"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Responsibilities</label>
                    {exp.responsibilities.map((resp: string, idx: number) => (
                      <Input
                        key={idx}
                        value={resp}
                        onChange={(e) => updateResponsibility(exp.id, idx, e.target.value)}
                        placeholder={`Responsibility ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
                <Plus size={18} className="mr-2" /> Add Experience
              </Button>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleSection("education")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Education *</span>
            <ChevronDown size={20} className={`transition ${expandedSections.education ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.education && (
            <div className="space-y-4 pb-4">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-900">{edu.degree || "New Education"}</h4>
                    <button onClick={() => deleteEducation(edu.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Degree *"
                  />
                  <Input
                    value={edu.institutionName}
                    onChange={(e) => updateEducation(edu.id, "institutionName", e.target.value)}
                    placeholder="Institution Name *"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={edu.startYear}
                      onChange={(e) => updateEducation(edu.id, "startYear", e.target.value)}
                      placeholder="Start Year"
                    />
                    <Input
                      value={edu.endYear}
                      onChange={(e) => updateEducation(edu.id, "endYear", e.target.value)}
                      placeholder="End Year"
                    />
                  </div>
                  <Input
                    value={edu.grade}
                    onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                    placeholder="Grade/GPA"
                  />
                </div>
              ))}
              <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
                <Plus size={18} className="mr-2" /> Add Education
              </Button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleSection("skills")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Skills</span>
            <ChevronDown size={20} className={`transition ${expandedSections.skills ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.skills && (
            <div className="space-y-3 pb-4">
              {cvData.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateSkill(idx, e.target.value)}
                    placeholder={`Skill ${idx + 1}`}
                  />
                  <button onClick={() => deleteSkill(idx)} className="text-red-500 hover:text-red-700 px-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button onClick={addSkill} variant="outline" className="w-full bg-transparent">
                <Plus size={18} className="mr-2" /> Add Skill
              </Button>
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="border-b border-slate-200">
          <button
            onClick={() => toggleSection("projects")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Projects</span>
            <ChevronDown size={20} className={`transition ${expandedSections.projects ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.projects && (
            <div className="space-y-4 pb-4">
              {cvData.projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-900">{proj.projectName || "New Project"}</h4>
                    <button onClick={() => deleteProject(proj.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <Input
                    value={proj.projectName}
                    onChange={(e) => updateProject(proj.id, "projectName", e.target.value)}
                    placeholder="Project Name"
                  />
                  <Input
                    value={proj.projectTags}
                    onChange={(e) => updateProject(proj.id, "projectTags", e.target.value)}
                    placeholder="Tags (e.g., React, Node.js)"
                  />
                  <Textarea
                    value={proj.projectDescription}
                    onChange={(e) => updateProject(proj.id, "projectDescription", e.target.value)}
                    placeholder="Project Description"
                    className="min-h-20"
                  />
                  <Input
                    value={proj.projectLink}
                    onChange={(e) => updateProject(proj.id, "projectLink", e.target.value)}
                    placeholder="Project Link (optional)"
                  />
                </div>
              ))}
              <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
                <Plus size={18} className="mr-2" /> Add Project
              </Button>
            </div>
          )}
        </div>

        {/* Interests */}
        <div>
          <button
            onClick={() => toggleSection("interests")}
            className="flex items-center justify-between w-full py-3 font-semibold text-slate-900 hover:text-blue-600 transition"
          >
            <span>Interests</span>
            <ChevronDown size={20} className={`transition ${expandedSections.interests ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.interests && (
            <div className="space-y-3 pb-4">
              {cvData.interests.map((interest, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={interest}
                    onChange={(e) => updateInterest(idx, e.target.value)}
                    placeholder={`Interest ${idx + 1}`}
                  />
                  <button onClick={() => deleteInterest(idx)} className="text-red-500 hover:text-red-700 px-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <Button onClick={addInterest} variant="outline" className="w-full bg-transparent">
                <Plus size={18} className="mr-2" /> Add Interest
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
