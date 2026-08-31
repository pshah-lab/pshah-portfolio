"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const navRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    // Navbar entrance animation
    const tl = gsap.timeline()
    tl.fromTo(navRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }).fromTo(
      logoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
      "-=0.25",
    )

    // Scroll spy functionality
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-stone-300/70 bg-[#f7f4ee]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#080b10]/95"
    >
      <div className="section-shell">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 dark:text-stone-50">
              Pratham Shah
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? "text-teal-700 dark:text-teal-300"
                      : "text-stone-600 hover:text-stone-950 dark:text-stone-200 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="rounded-full text-stone-700 hover:bg-stone-200/70 hover:text-stone-950 focus-visible:ring-teal-600 dark:text-stone-100 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-teal-300"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="rounded-full text-stone-700 hover:bg-stone-200/70 hover:text-stone-950 focus-visible:ring-teal-600 dark:text-stone-100 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-teal-300"
              >
                <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-stone-300/70 bg-[#f7f4ee] px-2 pb-3 pt-2 dark:border-white/10 dark:bg-[#080b10] sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? "text-teal-700 bg-teal-900/5 dark:text-teal-300 dark:bg-teal-300/10"
                      : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 dark:text-stone-200 dark:hover:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
