export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1>404</h1>
			<p>Esta página no existe.</p>

			<a
				href="/"
				className="mt-6">
				Volver
			</a>
		</main>
	);
}
