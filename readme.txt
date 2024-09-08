=== Book Review Block ===
Contributors: donnapep
Tags: book, book blog, book review, rating, review
Author URI: https://donnapeplinskie.com
Requires at least: 6.0
Tested up to: 6.6
Stable tag: 2.2.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A block to add book details and a star rating to a book review.

== Description ==

Book Review Block enables you to add details such as title, author, cover image, star rating and more to all of your book reviews.

= Save Time =
Book Review Block saves you valuable time when writing your reviews. No more copy and paste or manually entering the details of a book. Instead, you provide the ISBN, and the block automatically fills in information like title, author, and even the cover image.

= Increase Traffic =
Book Review Block adds Schema markup to the HTML. This can help increase site traffic by ensuring your Google search results stand out from the rest.

== Installation ==

1. In the editor, open the block inserter and search for *Book Review Block*.
1. Click the *Add Block* button.

== Screenshots ==

1. Empty State
2. Selected State

== Changelog ==

= 2.2.1 =
* Fix: "Creation of dynamic property" deprecation notice in PHP 8.2+

= 2.2.0 =
* Tweak: Hide label if associated field is empty
* Fix: Hide ISBN and API Key settings if user doesn't have manage_options capability

= 2.1.2 =
* Fix: Book cover alignment on block themes

= 2.1.1 =
* Fix: Broken description in editor
* Fix: Add whitespace around book cover

= 2.1.0 =
* New: Add block preview
* Tweak: Add description to parent block
* Tweak: Add more block keywords
* Tweak: Register scripts and styles instead of enqueueing them
* Tweak: Use block.json for block configuration
* Fix: Update block category of inner blocks

= 2.0.0 =
* New: Refactored to use inner blocks
* New: Added the ability to show labels for book metadata

= 1.5.1 =
* Tweak: Add help text to ISBN setting
* Fix: API Key not saving in some cases
* Fix: Broken rating on Twenty Twenty theme
* Fix: Add missing translation strings

= 1.5.0 =
* New: Get book details from Google Books API

= 1.4.0 =
* New: Add support for half-star ratings. Click once for full star or twice for half-star.
* Fix: Misalignment of block toolbar items

= 1.3.1 =
* New: Add book author, datePublished and numberOfPages to structured data
* Fix: Structured data error

= 1.3.0 =
* New: Create a separate "Book Review" block category
* New: Update icons for block and block category
* New: Deprecate version of block that previously stored attributes in post content
* Tweak: Simplify placeholder text displayed in editor

= 1.2.4 =
* Fix: HTML displaying in reviews

= 1.2.3 =
* Fix: Review not showing on front end

= 1.2.2 =
* Fix: style.css not loading in editor
* Fix: Error when editing summary
* Fix: Release Date not saving

= 1.2.1 =
* Fix: Gutenberg 4.5.0 compatibility

= 1.2.0 =
* New: Add support for rich snippets
* New: Provide upgrade path for migrating from the Book Review plugin

= 1.1.3 =
* Fix: Replace deprecated Gutenberg properties and component

= 1.1.2 =
* Fix: Gutenberg 4.0 compatibility

= 1.1.1 =
* Fix: Incorrect text saving when backspace key used
* Fix: Book cover extending outside parent element

= 1.1.0 =
* Fix: Address compatibility issues with Gutenberg
* New: Add drag and drop book cover uploads

= 1.0.0 =
* Initial release
