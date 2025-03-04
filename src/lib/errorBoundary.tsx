"use client"
import React, {ErrorInfo, ReactNode} from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        // Define a state variable to track whether there is an error or not
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error({error, errorInfo}); // TODO logging service
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({hasError: false})}
                    >
                        Try again?
                    </button>
                </div>
            );
        }

        // Return children components in case of no error
        return this.props.children;
    }
}

export default ErrorBoundary;