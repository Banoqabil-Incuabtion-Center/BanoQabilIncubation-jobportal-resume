-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 31, 2025 at 10:03 AM
-- Server version: 8.0.44-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `JobPortal`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Microsoft', '2025-11-17 03:01:34', '2025-11-17 03:01:34'),
(2, 'Google', '2025-11-19 01:22:46', '2025-11-19 01:22:46'),
(3, 'LinkedIn', '2025-11-27 04:18:26', '2025-11-27 04:18:26'),
(4, 'CreatifSoft', '2025-11-28 00:38:53', '2025-11-28 00:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint UNSIGNED NOT NULL,
  `job_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resume` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_letter` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_id`, `user_id`, `full_name`, `email`, `phone_no`, `resume`, `cover_letter`, `created_at`, `updated_at`) VALUES
(6, 15, 2, 'Shiza Fatima', 'shiza@gmail.com', '456638', 'resumes/MTvHCxjcf8Wp1yFY045DXRaPFJ2hOqaGaPJRM0a9.pdf', NULL, '2025-11-26 04:00:20', '2025-11-26 04:00:20'),
(7, 10, 2, 'Shiza Fatima', 'shiza@gmail.com', '456638', 'resumes/ozpw8MiM3FEqnTqJ6A6IIKkTAxqk0uXf6ga8rLkG.pdf', NULL, '2025-11-26 04:04:46', '2025-11-26 04:04:46'),
(8, 11, 2, 'Shiza Fatima', 'shiza@gmail.com', '456638', 'resumes/gATqxWbCgD8i5LY0lVRzKJjAVMTKuiBUMJvsMKPH.pdf', NULL, '2025-11-26 04:08:12', '2025-11-26 04:08:12'),
(9, 14, 2, 'Shiza Fatima', 'shiza@gmail.com', '456638', 'resumes/QnPiUHOMX1qELeMJV8jKliodtsGduZKIarIt7dd1.pdf', NULL, '2025-11-26 04:44:20', '2025-11-26 04:44:20'),
(10, 17, 2, 'Shiza Fatima', 'shiza@gmail.com', '456638', 'resumes/E1JTUkBOqAILzrczM0lMmwTU9eWEGoUjl4fWEGVt.pdf', 'hhghkjhiuo', '2025-12-03 23:49:41', '2025-12-03 23:49:41'),
(11, 18, 2, 'Shiza Fatima', 'shiza@gmail.com', '456638', 'resumes/vHnWijUVI0xFfbINmI31JLygiPBQxEfeagppJJUI.pdf', NULL, '2025-12-04 00:05:06', '2025-12-04 00:05:06'),
(12, 13, 2, 'shiza fatima', 'shiza@gmail.com', '456638', 'resumes/XRUC8HSacbS2HKY7nwGozbelEClNA9if0pEao7XN.pdf', NULL, '2025-12-22 04:36:35', '2025-12-22 04:36:35'),
(13, 22, 2, 'shiza fatima', 'shiza@gmail.com', '456638', 'resumes/CfeePBzZBAPpsd04qyYbHDzlSxaSYemQyajJDLHq.pdf', NULL, '2025-12-23 00:34:54', '2025-12-23 00:34:54'),
(14, 19, 2, 'shiza fatima', 'shiza@gmail.com', '456638', 'resumes/GTgRUS6FWGi4ynGBJQlwNMdREpptFso0IGmVqPsQ.pdf', NULL, '2025-12-23 00:57:27', '2025-12-23 00:57:27'),
(15, 21, 2, 'shiza fatima', 'shiza@gmail.com', '456638', 'resumes/JKqQolvEhfS9hpe99Uq1jEKMqCzp6I0CGPHrFlHv.pdf', NULL, '2025-12-23 00:58:20', '2025-12-23 00:58:20'),
(16, 20, 2, 'shiza fatima', 'shiza@gmail.com', '456638', 'resumes/OdrW7BHpUtuVVJMWzSge5RIiBZxlQ4gmvWk5P5hp.pdf', NULL, '2025-12-23 00:58:52', '2025-12-23 00:58:52'),
(17, 34, 2, 'shiza fatima', 'shiza@gmail.com', '456638', 'resumes/EKruC8sDoBuaFEfVP4BqylhfxgdFsf0UObKv7AOO.pdf', NULL, '2025-12-23 01:25:46', '2025-12-23 01:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_listings`
--

CREATE TABLE `job_listings` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_listings`
--

INSERT INTO `job_listings` (`id`, `title`, `salary`, `created_at`, `updated_at`, `company_id`, `user_id`) VALUES
(9, 'HR Executive', '$30,000 USD', '2025-11-19 01:36:31', '2025-11-19 01:36:31', 2, 3),
(10, 'PHP Developer', '$30,000 USD', '2025-11-19 01:38:19', '2025-11-19 01:38:19', 1, 1),
(11, 'Wordpress Developer', '$40,000 USD', '2025-11-19 03:15:37', '2025-11-19 03:15:37', 2, 3),
(12, 'PHP Developer', '$100,000 USD', '2025-11-19 03:16:00', '2025-11-19 03:16:00', 2, 3),
(13, 'Frontend Developer', '$40,000 USD', '2025-11-19 03:16:26', '2025-11-19 03:16:26', 2, 3),
(14, 'Backend Developer', '$50,000 USD', '2025-11-19 03:16:43', '2025-11-19 03:16:43', 2, 3),
(15, 'Senior Administration', '$50,000 USD', '2025-11-19 03:17:02', '2025-11-19 03:17:02', 2, 3),
(16, 'Administration', '$40,000 USD', '2025-11-19 03:21:27', '2025-11-19 03:21:27', 2, 3),
(17, 'Admin Officer', '$30,000 USD', '2025-12-02 03:06:35', '2025-12-02 03:06:35', 1, 1),
(18, 'clerk', '$10,000 USD', '2025-12-02 03:07:11', '2025-12-02 03:07:11', 1, 1),
(19, 'Front End Developer', '$50,000 USD', '2025-12-02 03:07:44', '2025-12-02 03:07:44', 1, 1),
(20, 'Backend Developer', '$50,000 USD', '2025-12-02 03:08:28', '2025-12-02 03:08:28', 1, 1),
(21, 'Data Analyst', '$100,000 USD', '2025-12-02 03:08:46', '2025-12-02 03:08:46', 1, 1),
(22, 'Data Scientist', '$100,000 USD', '2025-12-02 03:09:07', '2025-12-02 03:09:07', 1, 1),
(34, 'Test job', '$10,000', '2025-12-23 01:25:10', '2025-12-23 01:25:10', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversions_disk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint UNSIGNED NOT NULL,
  `manipulations` json NOT NULL,
  `custom_properties` json NOT NULL,
  `generated_conversions` json NOT NULL,
  `responsive_images` json NOT NULL,
  `order_column` int UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `model_type`, `model_id`, `uuid`, `collection_name`, `name`, `file_name`, `mime_type`, `disk`, `conversions_disk`, `size`, `manipulations`, `custom_properties`, `generated_conversions`, `responsive_images`, `order_column`, `created_at`, `updated_at`) VALUES
(8, 'App\\Models\\User', 2, 'a2aaa68b-6193-4ce6-9939-9d6a561b6d46', 'avatar', 'images', 'images.jpeg', 'image/jpeg', 'public', 'public', 3990, '[]', '[]', '{\"webp\": true, \"thumb\": true}', '[]', 1, '2025-12-31 04:38:58', '2025-12-31 04:38:58');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1),
(5, '2025_11_12_081000_create_job_listings_table', 1),
(6, '2025_11_14_090627_create_companies_table', 1),
(7, '2025_11_14_091441_add_company_id_to_users_table', 1),
(8, '2025_11_19_060719_add_company_id_to_job_listings_table', 2),
(10, '2025_11_19_063326_add_user_id_to_job_listings_table', 3),
(11, '2025_11_24_083618_create_saved_jobs_table', 4),
(12, '2025_11_25_093942_create_job_applications_table', 5),
(13, '2025_11_26_081722_create_applied_jobs_table', 6),
(14, '2025_12_05_063645_create_resumes_table', 7),
(15, '2025_12_10_092340_add_projects_languages_to_resumes_table', 8),
(16, '2025_12_11_092410_modify_linkedin_to_links_in_resumes_table', 9),
(17, '2025_12_15_092651_add_section_order_to_resumes_table', 10),
(18, '2025_12_16_061536_create_personal_access_tokens_table', 11),
(19, '2025_12_16_082815_create_personal_access_tokens_table', 12),
(20, '2025_12_18_055020_add_designation_to_resumes_table', 13),
(21, '2025_12_19_061709_create_personal_access_tokens_table', 14),
(22, '2025_12_23_062838_drop_applied_jobs_table', 14),
(23, '2025_12_30_064417_add_avatar_to_users_table', 15),
(24, '2025_12_31_055443_create_media_table', 16),
(25, '2025_12_31_094907_drop_avatar_columns_from_users_table', 17);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(4, 'App\\Models\\User', 1, 'postman', 'f7491443db26b6cf6e4908f2d97587f41cb566f0ebee03337d6209079dbfc91e', '[\"*\"]', NULL, NULL, '2025-12-22 01:45:56', '2025-12-22 01:45:56');

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE `resumes` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `links` json DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `experience` json DEFAULT NULL,
  `education` json DEFAULT NULL,
  `skills` json DEFAULT NULL,
  `certifications` json DEFAULT NULL,
  `projects` json DEFAULT NULL,
  `languages` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `section_order` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resumes`
--

INSERT INTO `resumes` (`id`, `user_id`, `full_name`, `designation`, `email`, `phone`, `links`, `address`, `summary`, `experience`, `education`, `skills`, `certifications`, `projects`, `languages`, `created_at`, `updated_at`, `section_order`) VALUES
(15, 2, 'Shiza Fatima', 'Web Developer', 'shizafatima31@gmail.com', '03028149991', '[{\"link\": \"https://github.com/shizafatima\", \"name\": \"Github\"}, {\"link\": \"https://linkedin.com/in/shiza-fatima-7bb557267\", \"name\": \"Linkedin\"}]', 'Karachi, Pakistan', 'Detail-oriented and motivated individual with a strong foundation in web technologies and application logic. Experienced in creating responsive interfaces, organizing data efficiently, and delivering user-friendly digital solutions. Known for problem-solving skills, adaptability, and attention to clean, structured work.', '[{\"title\": \"Web Developer - Intern\", \"company\": \"Bano Qabil\", \"end_date\": \"2025-12\", \"start_date\": \"2025-06\", \"description\": \"Gained hands-on experience in React.js, PHP, and MySQL during a 6-month internship.\\nDesigned and developed a full-scale To-Do application using React.js, improving task management efficiency with local storage persistence.\\nBuilt a database-driven To-Do app using PHP and MySQL, implementing secure user authentication and task CRUD operations.\\nContributed to the development of a role-based job portal application, implementing core features using Laravel framework and MySQL database.\"}]', '[{\"gpa\": \"3.49\", \"year\": \"2024\", \"degree\": \"Bachelors of Eastern Medicine and Surgery (BEMS)\", \"institution\": \"Ziauddin University\"}, {\"gpa\": null, \"year\": \"2018\", \"degree\": \"Higher Secondary Certificate\", \"institution\": \"Shaheed-e-Millat Govt. Degree Girls’ College\"}, {\"gpa\": null, \"year\": \"2016\", \"degree\": \"Secondary School Certificate\", \"institution\": \"Froebel Grammar Academy\"}]', '[\"HTML\", \"CSS\", \"Tailwind CSS\", \"JavaScript\", \"React.js\", \"PHP\", \"MYSQL\", \"Laravel\"]', '[{\"name\": \"WebWizard Web Development\", \"year\": \"2025\", \"organization\": \"Bano Qabil\"}]', '[{\"link\": \"https://to-do-app-one-rho.vercel.app/\", \"name\": \"To Do app\", \"description\": \"Build a responsive task management application using React.\\nImplemented features to add, edit, delete, and organize tasks with priorities, statuses, and due dates.\\nEnsured data persistence using local storage for a seamless user experience.\"}, {\"link\": \"https://react-ten-mu-44.vercel.app\", \"name\": \"React calculator\", \"description\": \"Created a basic calculator application using React.\\nEnabled users to perform addition, subtraction, multiplication, and division.\\nDesigned a clean and responsive interface for easy user interaction.\"}, {\"link\": \"https://todo.ct.ws/\", \"name\": \"Todo app(PHP, MySQL)\", \"description\": \"Developed a full-stack web-based To-Do app using PHP, HTML, CSS, and MySQL.\\nImplemented features including task creation, editing, deletion, and status tracking with persistent storage.\\nDesigned a responsive and user-friendly interface for efficient task management.\"}, {\"link\": \"https://github.com/shizafatima/JobPortal\", \"name\": \"Job Portal Application(Laravel, PHP, MySQL)\", \"description\": \"Developing a role-based job portal application with distinct recruiter and job seeker interfaces.\\nImplemented job posting, job search, job application, job saving, and resume builder features.\"}]', '[\"English(intermediate)\", \"Urdu(native)\"]', '2025-12-18 00:54:06', '2025-12-30 04:41:04', '[\"work-experience\", \"projects\", \"certification\", \"education\", \"skills\", \"languages\"]');

-- --------------------------------------------------------

--
-- Table structure for table `saved_jobs`
--

CREATE TABLE `saved_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `job_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `saved_jobs`
--

INSERT INTO `saved_jobs` (`id`, `user_id`, `job_id`, `created_at`, `updated_at`) VALUES
(30, 2, 9, NULL, NULL),
(31, 2, 10, NULL, NULL),
(33, 2, 18, NULL, NULL),
(34, 2, 13, NULL, NULL),
(35, 2, 12, NULL, NULL),
(36, 2, 11, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('600IFQDY4y70fYFHbfykpBXNJVTsa7yJ2Iur2GyT', 2, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiVUx5NE16b2NPamp1RjZsOTNHSnB0d3E5UFRRZ2lwQ1hOSkUzRW1ueCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjQxOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3VzZXIvc2F2ZWQtam9icyI7czo1OiJyb3V0ZSI7Tjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjtzOjE3OiJwYXNzd29yZF9oYXNoX3dlYiI7czo2MDoiJDJ5JDEyJEVQTEpadDNIcjBOalRBWGlQNUNtME9zd0toZFl5RExVTzZZa212aXVTREpjSWtOYmQ3Tmx5Ijt9', 1767175341);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'job-seeker',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `company_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`, `company_id`) VALUES
(1, 'admin', 'admin@example.com', 'recruiter', '2025-11-10 08:27:32', '$2y$12$Vn9RB/iBGjIXegV2.rtTKuEG7BYAZJrVZRUSWrKADhCkPKTdUW4cy', NULL, NULL, NULL, NULL, '2025-11-17 03:01:34', '2025-11-17 03:01:34', 1),
(2, 'shiza', 'shiza@gmail.com', 'jobSeeker', '2025-11-10 08:30:43', '$2y$12$EPLJZt3Hr0NjTAXiP5Cm0OswKhdYyDLUO6YkmviuSDJcIkNbd7Nly', NULL, NULL, NULL, NULL, '2025-11-17 03:17:09', '2025-11-17 03:17:09', NULL),
(3, 'John', 'john@test.com', 'recruiter', '2025-11-19 08:12:21', '$2y$12$ZSYENJ7Z7NnHYz0Kar42ievkdvlTp0maYknJv73qqYQB9POCV/hb2', NULL, NULL, NULL, NULL, '2025-11-19 01:22:46', '2025-11-19 01:22:46', 2),
(4, 'Baker', 'baker@test.com', 'recruiter', NULL, '$2y$12$Qnm6gjQy9.dnEUZ.V.hmXegeZE7erfodWz8xb5cjAG0y9f2KemPme', NULL, NULL, NULL, NULL, '2025-11-27 04:18:27', '2025-11-27 04:18:27', 3),
(5, 'Ali', 'ali@example.com', 'jobSeeker', '2025-11-27 09:34:08', '$2y$12$5OvEQHeQ/MoPn6cnud2ji.SRlP0qesSCG280Uvm3QFRe3ZKQdqa/K', NULL, NULL, NULL, NULL, '2025-11-27 04:26:30', '2025-11-27 04:26:30', NULL),
(7, 'sss', 'sss@g.com', 'jobSeeker', NULL, '$2y$12$zfTAGJ0fbpqVoCe7cGlkd.xABUnIiIsOWe/6PkBZnmdyzvPY.OKOm', NULL, NULL, NULL, NULL, '2025-11-27 04:45:21', '2025-11-27 04:45:21', NULL),
(9, 'eee', 'eee@g.com', 'jobSeeker', NULL, '$2y$12$hvs5KHNwhgF6Xv/IeSnigeu0smSt8CqCsznlbEOfypFphaDUuEK12', NULL, NULL, NULL, NULL, '2025-11-28 00:11:54', '2025-11-28 00:11:54', NULL),
(10, 'hussain', 'hussain@e.com', 'jobSeeker', NULL, '$2y$12$LMqOcz3rr7oiP58iEMcQEOx2N9Py5TfqW51If5CNiRTupprt.HErG', NULL, NULL, NULL, NULL, '2025-11-28 00:32:58', '2025-11-28 00:32:58', NULL),
(11, 'clay', 'clay@e.com', 'recruiter', NULL, '$2y$12$yib0H8U0t8/pOafKoC8JX.XK6/QGqWz0mxpJOYHLu6On8fDDSTtTS', NULL, NULL, NULL, NULL, '2025-11-28 00:38:53', '2025-11-28 00:38:53', 4),
(12, 'mike', 'mike@example.com', 'jobSeeker', NULL, '$2y$12$t/Eiph5LnSCuppfD7PzlhOu5StBYmNrCi0j/eA.NpM9yJu0JsGuRi', NULL, NULL, NULL, NULL, '2025-12-23 04:27:18', '2025-12-23 04:27:18', NULL),
(13, 'wheeler', 'wheeler@example.com', 'recruiter', NULL, '$2y$12$d5zqztqr1GjGqi9wrc8fGesOJiJWMRJxYaKPJANDWrPbyQAi5n9uq', NULL, NULL, NULL, NULL, '2025-12-23 04:32:30', '2025-12-23 04:32:30', 3),
(14, 'Billy', 'billy@e.com', 'recruiter', NULL, '$2y$12$ho9hxvvStaDLZUoSuFJjveI/ruiS.S1dhtqCxUdI5Eg2RiQw5nDBe', NULL, NULL, NULL, NULL, '2025-12-24 01:23:27', '2025-12-24 01:23:27', 3),
(15, 'Jane', 'jane@example.com', 'recruiter', NULL, '$2y$12$K8tkj1s/dk4bNxmK4eaxBeeH7lHdHLp70MP64nbs4sFpySs2u00Z2', NULL, NULL, NULL, NULL, '2025-12-30 04:46:43', '2025-12-30 04:46:43', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_applications_job_id_user_id_unique` (`job_id`,`user_id`),
  ADD KEY `job_applications_user_id_foreign` (`user_id`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_listings`
--
ALTER TABLE `job_listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_listings_company_id_foreign` (`company_id`),
  ADD KEY `job_listings_user_id_foreign` (`user_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `media_uuid_unique` (`uuid`),
  ADD KEY `media_model_type_model_id_index` (`model_type`,`model_id`),
  ADD KEY `media_order_column_index` (`order_column`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resumes_user_id_foreign` (`user_id`);

--
-- Indexes for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `saved_jobs_user_id_job_id_unique` (`user_id`,`job_id`),
  ADD KEY `saved_jobs_job_id_foreign` (`job_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_company_id_foreign` (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `job_listings`
--
ALTER TABLE `job_listings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `resumes`
--
ALTER TABLE `resumes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_job_id_foreign` FOREIGN KEY (`job_id`) REFERENCES `job_listings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `job_applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_listings`
--
ALTER TABLE `job_listings`
  ADD CONSTRAINT `job_listings_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `job_listings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `resumes`
--
ALTER TABLE `resumes`
  ADD CONSTRAINT `resumes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD CONSTRAINT `saved_jobs_job_id_foreign` FOREIGN KEY (`job_id`) REFERENCES `job_listings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saved_jobs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
