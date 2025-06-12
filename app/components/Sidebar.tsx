'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

type Section = {
  title: string;
  id: string;
  subsections?: Section[];
};

const sections: Section[] = [
  {
    title: 'Introduction',
    id: 'introduction',
  },
  {
    title: 'Getting Started',
    id: 'getting-started',
    subsections: [
      { title: 'Account Setup', id: 'account-setup' },
      { title: 'Navigation Basics', id: 'navigation-basics' },
    ],
  },
  {
    title: 'Horse Management',
    id: 'horse-management',
    subsections: [
      { title: 'Adding a New Horse', id: 'adding-a-new-horse' },
      { title: 'Viewing Horse Details', id: 'viewing-horse-details' },
      { title: 'Updating Horse Information', id: 'updating-horse-information' },
      { title: 'Horse History Tracking', id: 'horse-history-tracking' },
      { title: 'Horse Photos', id: 'horse-photos' },
    ],
  },
  {
    title: 'Task Management',
    id: 'task-management',
    subsections: [
      { title: 'Creating Tasks', id: 'creating-tasks' },
      { title: 'Recurring Tasks', id: 'recurring-tasks' },
      { title: 'Completing Tasks', id: 'completing-tasks' },
      { title: 'Task History', id: 'task-history' },
    ],
  },
  {
    title: 'Health Management',
    id: 'health-management',
    subsections: [
      { title: 'Health Records', id: 'health-records' },
      { title: 'Veterinary Visits', id: 'veterinary-visits' },
      { title: 'Medication Tracking', id: 'medication-tracking' },
      { title: 'Health Alerts', id: 'health-alerts' },
    ],
  },
  {
    title: 'Feed and Medicine Management',
    id: 'feed-and-medicine-management',
    subsections: [
      { title: 'Setting Up Feed Types', id: 'setting-up-feed-types' },
      { title: 'Setting Up Medicine Types', id: 'setting-up-medicine-types' },
      { title: 'Dosage Information', id: 'dosage-information' },
    ],
  },
  {
    title: 'Calendar and Events',
    id: 'calendar-and-events',
    subsections: [
      { title: 'Creating Events', id: 'creating-events' },
      { title: 'Event Categories', id: 'event-categories' },
      { title: 'Event Notifications', id: 'event-notifications' },
    ],
  },
  {
    title: 'Organization Management',
    id: 'organization-management',
    subsections: [
      { title: 'Creating an Organization', id: 'creating-an-organization' },
      { title: 'Inviting Members', id: 'inviting-members' },
      { title: 'Role Management', id: 'role-management' },
      { title: 'Permissions System', id: 'permissions-system' },
    ],
  },
  {
    title: 'Dashboard Customization',
    id: 'dashboard-customization',
    subsections: [
      { title: 'Widget Overview', id: 'widget-overview' },
      { title: 'Customizing Your Dashboard', id: 'customizing-your-dashboard' },
      { title: 'Quick Stats', id: 'quick-stats' },
    ],
  },
  {
    title: 'Wiki AI Chat Assistant',
    id: 'wiki-ai-chat-assistant',
    subsections: [
      { title: 'Starting a Conversation', id: 'starting-a-conversation' },
      { title: 'Saving Conversations', id: 'saving-conversations' },
      { title: 'Horse Care Knowledge Base', id: 'horse-care-knowledge-base' },
    ],
  },
  {
    title: 'Account Settings',
    id: 'account-settings',
    subsections: [
      { title: 'Profile Management', id: 'profile-management' },
      { title: 'Notification Preferences', id: 'notification-preferences' },
      { title: 'Theme Settings', id: 'theme-settings' },
    ],
  },
  {
    title: 'Troubleshooting',
    id: 'troubleshooting',
    subsections: [
      { title: 'Permission Issues', id: 'permission-issues' },
      { title: 'Data Synchronization', id: 'data-synchronization' },
      { title: 'Common Problems', id: 'common-problems' },
    ],
  },
  {
    title: 'Getting Help',
    id: 'getting-help',
  },
];

type NavItemProps = {
  section: Section;
  activeSection: string;
  setActiveSection: (id: string) => void;
};

const NavItem = ({ section, activeSection, setActiveSection }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(activeSection === section.id || activeSection.startsWith(`${section.id}-`));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setActiveSection(section.id);
    if (section.subsections && section.subsections.length > 0) {
      toggleOpen();
    }
  };

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
          activeSection === section.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={handleClick}
      >
        <span className="text-sm font-medium">{section.title}</span>
        {section.subsections && section.subsections.length > 0 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </button>
        )}
      </div>
      
      {isOpen && section.subsections && (
        <div className="ml-4 mt-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
          {section.subsections.map((subsection) => (
            <div
              key={subsection.id}
              className={`px-3 py-1.5 rounded-md cursor-pointer text-sm ${
                activeSection === subsection.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setActiveSection(subsection.id)}
            >
              {subsection.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (id: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden p-4">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:text-blue-500 hover:border-blue-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <span className="ml-2">Menu</span>
        </button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <div className={`
        md:block
        ${isMobileMenuOpen ? 'block' : 'hidden'}
        bg-white dark:bg-gray-800 
        md:w-64 w-full
        md:h-[calc(100vh-4rem)] 
        overflow-y-auto
        border-r border-gray-200 dark:border-gray-700
      `}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <div className="space-y-1">
            {sections.map((section) => (
              <NavItem 
                key={section.id}
                section={section}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 