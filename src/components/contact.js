import React from 'react';
import '../styles/contact.scss';

const FormInputBox = (props) => <input type="text" placeholder={props.prompt} name={props.name} />;

const FormTextBox = (props) => <textarea placeholder={props.prompt} rows="10" name={props.name} />;

export const PrimaryButton = (props) => <input type="submit" className="primary-button" value={props.title} />;

export default (props) => (
    <section className="contact" id="contact">
		<form action="https://formspree.io/xjvwlqdd" method="POST">
			<h2>Contact</h2>
            <div className="container">
                <div className="greeting">
                    <p>Thank you for your interest in my artwork!</p>
                    <p>
                    If you’d like to enquire about the price of any art or discuss a possible commission, or if you need any information related to any of my works, please don’t hesitate to get in touch. 
                    </p>
                    
                </div>
			<div className="form">
					<FormInputBox prompt="Full Name*" name="name" />
					<FormInputBox prompt="Email*" name="_replyTo" />
					<FormInputBox prompt="Subject*" name="subject" />
					<FormTextBox prompt="Write a note.*" name="message" />
                    <PrimaryButton title="Get In Touch" />
			</div>
			
            </div>
		</form>
	</section>
)
/*
*/