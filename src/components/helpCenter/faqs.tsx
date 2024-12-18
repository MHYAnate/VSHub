"use client";
import React, { useState, useEffect } from 'react'
import { Faqs } from '@/database/faqsData'
import ChevronSvg from '../btn/chevronSvg';

interface NavProps {
  searchTerm : string
  activeCategory : string
}

const HelpCenterFaqs: React.FC<NavProps>= ({ searchTerm,  activeCategory}) => {

  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({})

  const filteredFaqs = Faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => activeCategory === 'All' || category.category === activeCategory)

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setExpandedQuestions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    setExpandedQuestions({})
  }, [activeCategory, searchTerm])
  
	return (
    <div className="space-y-8">
    {filteredFaqs.map((category, categoryIndex) => (
      <div key={category.category} className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-900 p-6 bg-gray-50">{category.category}</h2>
        <div className="divide-y divide-gray-200">
          {category.questions.map((faq, questionIndex) => {
            const isExpanded = expandedQuestions[`${categoryIndex}-${questionIndex}`]
            return (
              <div key={questionIndex} className="p-6">
                <button
                  className="flex justify-between items-start w-full text-left"
                  onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-8">{faq.q}</h3>
                  <span className={`${isExpanded ? 'rotate-180' : ''}`}><ChevronSvg/></span>
                </button>
                {isExpanded && (
                  <p className="mt-4 text-gray-600 animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    ))}
  </div>
	);
};

HelpCenterFaqs.displayName = "HelpCenterFaqs";
export default HelpCenterFaqs;
