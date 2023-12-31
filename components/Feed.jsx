'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [post, setPost] = useState([]);

	const [filteredPosts, setFilteredPosts] = useState([]); // store the filtered posts

	// handle the search input change
	const handleSearchChange = (e) => {
		const text = e.target.value;

		setFilteredPosts(
			post.filter((p) => {
				return (
					p.prompt.toLowerCase().includes(text.toLowerCase()) ||
					p.creator.username.toLowerCase().includes(text.toLowerCase()) ||
					p.tag.toLowerCase().includes(text.toLowerCase())
				);
			})
		);

		setSearchText(text);
	};

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();

			setPost(data);
		};

		fetchPost();
	}, []);

	const handleTagClick = (tag) => {
		setSearchText(tag);
		setFilteredPosts(
			post.filter((p) => {
				return (
					p.prompt.toLowerCase().includes(tag.toLowerCase()) ||
					p.creator.username.toLowerCase().includes(tag.toLowerCase()) ||
					p.tag.toLowerCase().includes(tag.toLowerCase())
				);
			})
		);
	};

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for tag or username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>
			<PromptCardList
				data={searchText.length === 0 ? post : filteredPosts}
				handleTagClick={handleTagClick}
			/>
		</section>
	);
};

export default Feed;
